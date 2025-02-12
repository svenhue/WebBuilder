import { NodeStatus } from "../../node.core/NodeStatus.js";
import { INodeResult } from "../../node.core/INodeResult.js";
import { ITaskOutput } from "./ITaskOutput.js";


export interface ITaskResult extends INodeResult{
    status: NodeStatus
    errorMessage?: string
    output: ITaskOutput
}