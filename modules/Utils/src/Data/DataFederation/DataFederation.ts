import { IDataAdapter } from "../DataAdapters/IDataAdapter.js";

export class DataFederation{

    adapters: Array<IDataAdapter>
    
    constructor(){
        this.adapters = []
    }
    AddAdapter(adapter: IDataAdapter){  
        this.adapters.push(adapter)
    }
    GetBOData(boType: string){
        console.log(boType)
    }

}