//@ts-ignore
import { injectable } from "inversify";
import { IStateProvider } from "./IStateProvider.js";
import { IStateSetter } from "./IStateSetter.js";

@injectable()
export class GlobalStateProvider{

    viewContexts: Array<{
        viewId: string,
        stateProvider?: Array<IStateProvider>,
        stateSetter?: Array<IStateSetter>,
        localActions?: Array<{methodName: string, function: () => void}>
    }>
    constructor(){
        this.viewContexts = []
    }   
    public AddViewContext(viewContext: {
        viewId: string,
        stateProvider?: Array<IStateProvider>,
        stateSetter?: Array<IStateSetter>,
        localActions?: Array<{methodName: string, function: () => void}>
    }){
        this.viewContexts.push(viewContext)
    }
    public  RemoveViewContext(viewId: string){
        const i = this.viewContexts.findIndex(vc => vc.viewId == viewId)
        if(i >= 0){
            this.viewContexts.splice(i, 1)
        }
        
    }

    public CallState(viewId: string, methodName: string){
        const viewContext = this.viewContexts.find(vc => vc.viewId == viewId)
        console.log('viewContext', viewId, methodName, viewContext)
        if(viewContext == undefined){
            return;
        }
        const localAction = viewContext.localActions?.find(la => la.methodName == methodName)
        if(localAction == undefined){
            return;
        }
        localAction.function()
    }
}