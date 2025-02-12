import { IWorkflow } from "./IWorkflow";

export class WorkflowValidator{
    static validateWorkflow(workflow: IWorkflow): boolean{
        // Validate the workflow
        if(workflow == undefined || workflow == null){
            return false;
        }
        return true;
    }
}