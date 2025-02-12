import { WorkflowStatus } from "./WorkflowStatus";
import { IDataContainer } from "src/environment/IDataContainer";

export interface IWorkflowResult{
    status: WorkflowStatus
    data: IDataContainer
}