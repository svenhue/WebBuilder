import { ITaskOutput } from "./ITaskOutput.js";
import { TaskStatus } from "./TaskStatus.js";

export interface ITaskResult{
    status: TaskStatus
    errorMessage?: string
    output: ITaskOutput
}