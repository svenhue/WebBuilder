import { INode } from "../../node.js";
import { IResourceInput } from "./IResourceInput.js";

export interface IResource extends INode{
    input: IResourceInput
    GetActions(): Array<string>;
    ExecuteAction(input: IResource): void
}