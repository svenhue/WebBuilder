

import { IApplicationModule } from './Application/IApplicationModule.js';
import { IClientWorkflow } from './ClientActions/Workflow/IClientWorkflow.js';
import { IWorkflowDescription } from './ClientActions/Workflow/IWorkflowDescription.js';
import { IExternalNetworkConfiguration } from './HTTP/IExternalNetworkConfiguration.js';
export class UtilityModule implements IApplicationModule{
    
    name: string = "UtilityModule"
    ressources = []
    components: []
    networkConfigs: IExternalNetworkConfiguration[];
    workflows: (IWorkflowDescription | IClientWorkflow)[];
    
    constructor(){
    }
    InitializeServices(): void {
        
    }


}