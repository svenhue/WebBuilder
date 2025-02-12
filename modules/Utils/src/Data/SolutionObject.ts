//@ts-nocheck
import { useWebNodeStore } from '../stores/useWebNodeStore.js';

export class SolutionObject{

    name: string
    type?: string
    guui?: string
    sessioncontextid?: number
    value: object
    initialValue?: object
    clientroute: string;
    constructor(name: string, type?: string, guui?: string, value?: object, contextid?: number){
        this.name = name;
        this.type = type;
        this.guui = guui;
        this.value = value;
        this.sessioncontextid = contextid;
    }
    GetType(){
        return this.type;
    }
    finalizeSolution(){
        if(this.sessioncontextid != undefined){
            this.value = JSON.parse(JSON.stringify(useWebNodeStore().getContextWebNodes(this.sessioncontextid).value))
        }
        if(this.type?.includes('diagram')){
            const i = this.value.findIndex((v: object) => v.type.includes('env'));
            if(i != -1){
                this.value.splice(i, 1);
            }
        }
    }
    getValue(){
        
        return this.value;
    }



}