import { injectable } from "inversify";
import { IClientWorkflow } from "./IClientWorkflow";

@injectable()
export class WorkflowEngine{

    constructor(){
        
    }
    public runInstance(workflow: IClientWorkflow){
        
       if(workflow == undefined){
        throw new Error('Workflow not defined');
       }

       workflow.execute({});
    }
}