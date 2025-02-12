import { INodeOutput } from "../../node.core/INodeOutput.js";

export interface ITaskOutput extends INodeOutput{
    value: Object | Array<any> | string | number | boolean
}