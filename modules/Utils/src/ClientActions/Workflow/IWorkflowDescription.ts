
import { IWorkflowTrigger } from "./Trigger/IWorkflowTrigger.js";
import { WorkflowConfigTypes } from "./WorkflowConfigTypes.js";


export interface IWorkflowDescription {
    trigger: IWorkflowTrigger
    configType: WorkflowConfigTypes,
    code?: string
    config?: Array<object>
}