import { RestrictedServiceProvider } from "src/Services/Provider/RestrictedServiceProvider";
import { IWorkflowTrigger } from "./Trigger/IWorkflowTrigger";
import { WorkflowConfigTypes } from "./WorkflowConfigTypes";
import { useIdentityStore } from "src/stores/useIdentityStore";



export interface IWorkflowDescription {

    trigger: IWorkflowTrigger
    configType: WorkflowConfigTypes,
    code?: string
    config?: Array<object>
}