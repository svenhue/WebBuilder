import { INode, Node } from "../../node.js";
import { TaskTypes } from "../TaskTypes.js";
import { ITaskInput } from "./ITaskInput.js";
import { ITaskResult } from "./ITaskResult.js";
import { INodeType } from "../../node.core/INodeType.js";

export interface ITask extends INode{
    serverOnly?: boolean;
    clientOnly?: boolean;
    type: INodeType;
    input: ITaskInput;
    Execute(input: ITask): Promise<ITaskResult>;
}