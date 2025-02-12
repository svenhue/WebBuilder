//@ts-nocheck

import { Filter } from './Filter.js';

interface IDefaultStringOptions{
    and: boolean;
}

export class FilterChain{
    filters: Filter[];
    and: boolean
    subChains: FilterChain[];
    key?:number
    constructor(and?: boolean, filters?: Filter[]){
        this.and = and;
        if(filters?.length > 0){
            for(const filter of filters){
                this.addFilter(filter);
            }
        }
    }

    public addFilter(filter: Filter){
        if(this.filters == null){
            this.filters = [];
        }
        if(filter.key == undefined){
            this.SetFilterKey(filter);
        }
        this.filters.push(filter);
    }
    private SetFilterKey(filter: Filter){
        const keys = this.filters.map(f => f.key);
        if(keys.length == 0){
            filter.key = 0;
        }else{
            filter.key = (Math.max(...keys.map(k => Number(k))) + 1);
        }
    }
    SetChainKey(chain: FilterChain){
        const keys = this.subChains.map(f => f.key);
        if(keys.length == 0){
            chain.key = 0;
        }else{
            chain.key = (Math.max(...keys.map(k => Number(k))) + 1);
        }
    }

    public removeFilter(filter: Filter){
        this.filters = this.filters.splice(this.filters.indexOf(filter), 1);
    }
    public static CountAndAndOr(filter: string): boolean{
        const and = filter.indexOf('&&');
        const or = filter.indexOf('||');
        return and != -1 && or != -1;
    }
    public static CheckStringIsValid(): boolean{
        //const regex = Filter.CountOperators(filter)


    }
    public static FromString(stringChain: string, defaults: IDefaultStringOptions = {and: true}): FilterChain{
        
        const chain = new FilterChain();
        chain.and = defaults.and;

        const regex = /\{\((.*?)\)\}/g; // /\{\(\)\}/g; // /\{ *\}/g;
        
        
        if(!stringChain.startsWith('{(') || !stringChain.endsWith(')}')){
            stringChain =  '{(' + stringChain + ')}';
        }
       
        const startI = stringChain.indexOf('{(');
        const endI = stringChain.lastIndexOf(')}');
        stringChain = stringChain.substring(startI+2, endI);


        
        const newChain = new FilterChain();
        const subChains = stringChain.match(regex);

        if(subChains != null && subChains?.length > 0 && typeof subChains[Symbol.iterator] === 'function'){
            for(const subChain of subChains){
               
                const newSubChain = FilterChain.FromString(subChain);
                chain.addChild(newSubChain);
            }
        }
        
        //const filterStrings = Filter.GetFiltersFromString(stringChain);

        for(const f of splitFiltersByAndOrOr){

            const filter = Filter.FromString(f);
            newChain.addFilter(filter);
        }
        chain.addChild(newChain);
        
        console.log(chain)
        return chain;
    }
    public static RemoveChainStringCrumps(filter: string): string{
        const firstIndex = filter.indexOf('{(');
        const lastIndex = filter.lastIndexOf(')}');
        if(firstIndex == -1 || lastIndex == -1){
            return filter;
        }
        return filter.substring(firstIndex+2, lastIndex);
    }
    public addChild(chain: FilterChain){
        if(this.subChains == null){
            this.subChains = [];
        }
        this.SetChainKey(chain);
        this.subChains.push(chain);
    }
    public Run(value: object | number | string): boolean{
        if(this.and == true){
            for(const filter of this.filters){
                if(filter.Run(value) == false){
                    return false;
                }
            }
            for(const chain of this.subChains){
                if(chain.Run(value) == false){
                    return false;
                }
            }
        }
        else if(this.and == false){
            for(const filter of this.filters){
                if(filter.Run(value) == true){
                    return true;
                }
            }
            for(const chain of this.subChains){
                if(chain.Run(value) == true){
                    return true;
                }
            }
        }
        return this.filters[0].Run(value);
    }
}