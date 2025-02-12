import { Container } from 'inversify';
import { IExternalNetworkConfiguration } from '../HTTP/IExternalNetworkConfiguration.js';
import { IViewConfiguration } from '../View/IViewConfiguration.js';
import { IWorkflowDescription } from '../ClientActions/Workflow/IWorkflowDescription.js';
import { IClientWorkflow } from '../ClientActions/Workflow/IClientWorkflow.js';

export interface IApplicationModule {
    components: Array<IViewConfiguration>;
    name: string;
    networkConfigs: Array<IExternalNetworkConfiguration>
    InitializeServices(container: Container): void;
    workflows: Array<IWorkflowDescription | IClientWorkflow>
    register(): void;
}