import { injectable } from "inversify";
import { IClientWorkflow } from "./IClientWorkflow.js";

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