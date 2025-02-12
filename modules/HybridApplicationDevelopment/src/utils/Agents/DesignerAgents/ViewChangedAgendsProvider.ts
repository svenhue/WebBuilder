//@ts-ignore
//@ts-nocheck
import { IDataAdapter } from "alphautils";
import { injectable,inject, interfaces } from "inversify";
import { FormDesignerAgent } from "./FormAgents/FormDesignerAgents";


@injectable()
export class ViewChangedAgendsProvider{

    private dataAdapter: IDataAdapter
    private dataAdapterconstructor: interfaces.Newable<IDataAdapter>

    private formdesignerAgent: FormDesignerAgent


    constructor(
        @inject('DataAdapterConstructor') dataAdapterConstructir: interfaces.Newable<IDataAdapter>,
    ){
        this.dataAdapterconstructor = dataAdapterConstructir
     
    }

    public setContext(contextid: number){
        return contextid;
    }


    public onChanged(id, newValue, changeType, oldValue){
        this.formdesignerAgent.onChanged(id, newValue, changeType, oldValue)      
    }

}