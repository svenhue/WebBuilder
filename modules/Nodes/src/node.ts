import { INodeInput } from "./node.core/INodeInput.js";
import { INodeResult } from "./node.core/INodeResult.js";
import { INodeType } from "./node.core/INodeType.js";


interface INode{
    runId: number
    name: string;
    id: string
    type: INodeType
    input: INodeInput
    Execute(node: INode): Promise<INodeResult>;
    codeValue: string;
    isStartNode: boolean;
}

class Node implements INode{
    name: string;   
    id: string;
    type: INodeType;    
    input: INodeInput;
    runId: number;
    codeValue: string;
    isStartNode: boolean;

    constructor(input: INode){
        Object.assign(this, input);
    }

    public async Execute(): Promise<INodeResult> {
        throw new Error("Method not implemented.");
    }
}

export { type INode, Node}