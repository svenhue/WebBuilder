import { NodeTypes } from "./NodeTypes.js"

export interface INodeType{
    namespace: string,
    name: string
    type: NodeTypes
}