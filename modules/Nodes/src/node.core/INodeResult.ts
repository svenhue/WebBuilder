import { INodeOutput } from "./INodeOutput.js"

export interface INodeResult{
    status: string
    errorMessage?: string
    output: INodeOutput
}