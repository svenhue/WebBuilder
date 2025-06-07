
import { IWorkflowTrigger } from "./Trigger/IWorkflowTrigger";
import { WorkflowConfigTypes } from "./WorkflowConfigTypes";


export interface IWorkflowDescription {
    trigger: IWorkflowTrigger
    configType: WorkflowConfigTypes,
    code?: string
    config?: Array<object>
}