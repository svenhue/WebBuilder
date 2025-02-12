import { INode } from "src/node.js";
import { DataContainer } from "./DataContainer";

export interface IRuntimeEnvironment{
    execNode(node: INode)
    getData(): DataContainer
}