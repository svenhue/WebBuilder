import { FilterChain } from "./FilterChain.js";

export class Query{


    filterChain: FilterChain;

    constructor(){
       
    }
    public AddChain(filterChain: FilterChain, defaultAnd = true){
        if(this.filterChain == null){
            this.filterChain = new FilterChain(defaultAnd);
            return;
        }
        this.filterChain.addChild(filterChain);
    }

    public Get(values: Array<object>){
        if(this.filterChain == null){
            return values;
        }
        return values.filter((value) => {
            return this.filterChain.Run(value);
        });
    }
}