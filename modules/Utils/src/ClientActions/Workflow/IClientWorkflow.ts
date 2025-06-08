import { executeInput } from "./ClientWorkflow.js";
import { IWorkflowDescription } from "./IWorkflowDescription.js";

export interface IClientWorkflow{
    config: IWorkflowDescription;
    execute(executeInput: executeInput): void;
}