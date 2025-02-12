//@ts-nocheck

import { IClientWorkflow } from "./IClientWorkflow.js";
import { IWorkflowDescription } from "./IWorkflowDescription.js";
type executeInput = {
    serviceProvider?: RestrictedServiceProvider,
    identityStore?: ReturnType<typeof useIdentityStore>,
}


class ClientWorkflow implements IClientWorkflow{
    config: IWorkflowDescription;
    
    constructor(config: IWorkflowDescription){
        this.config = config;
    }

    public execute(executeInput: executeInput){
        console.log('Workflow executed');
    }


}

export { ClientWorkflow, executeInput };