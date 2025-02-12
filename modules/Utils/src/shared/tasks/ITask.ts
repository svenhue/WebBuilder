import { ITaskInput } from "./ITaskInput.js";
import { ITaskResult } from "./ITaskResult.js";

export interface ITask{
    serverOnly?: boolean;
    clientOnly?: boolean;
    type: string;
    Execute(input: ITaskInput): Promise<ITaskResult>;
}