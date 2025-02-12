//@ts-ignore
//@ts-nocheck
import { IDataAdapter, StateChangeTypes } from "alphautils";
import { FocussedViewContextService } from "../../../Services/Designer/FocussedViewContextService";

export class FormDesignerAgent{

    private dataAdapter: IDataAdapter
    private focussedService: FocussedViewContextService

    constructor(
        focussedService: FocussedViewContextService
    ){
        this.focussedService = focussedService
    }

    public setDataAdapter(dataAdapter: IDataAdapter){
        this.dataAdapter = dataAdapter
    }


    public onChanged(id, newValue, changeType, oldValue){
        return;
        if(oldValue == undefined){
            return;
        }
        if(oldValue.type.includes('Form') == false){
            return;
        }
        if(changeType == StateChangeTypes.updatePartial){
            const key = newValue?.keyValuePairs[0].key
            const value = newValue?.keyValuePairs[0].value
            if( key == 'children' && oldValue['children'] != value){
                console.log('FormDesignerAgent.onChanged', id, newValue, changeType, oldValue)
            }
        }
    }

    private SyncFormFieldsAndChildren(){

    }
}