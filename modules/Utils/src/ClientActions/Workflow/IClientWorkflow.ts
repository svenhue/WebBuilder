import { executeInput } from "./ClientWorkflow";
import { IWorkflowDescription } from "./IWorkflowDescription";

export interface IClientWorkflow{
    config: IWorkflowDescription;
    execute(executeInput: executeInput): void;
}