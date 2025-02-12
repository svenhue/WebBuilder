import { INode, Node } from "../node";
import { INodeResult } from "../node.core/INodeResult";
import { INodeType } from "../node.core/INodeType";
import { NodeTypes } from "../node.core/NodeTypes";

export class SortNode extends Node{

    override type: INodeType = {
        type: NodeTypes.core,
        name: "sort",
        namespace: "core.sortnode"
    }
    constructor(input: INode){
        super(input);
    }

    public override async Execute(): Promise<INodeResult>{
        const result = await this.Sort(this.input.parameters['field'] as string, this.input.parameters['desc'] as boolean, this.input['data']['items'] as Array<object>);
        return {
            status: "success",
            output: {
                value: result
            }
        }
    }

    private async Sort(field: string, desc: boolean, items: Array<object>): Promise<Array<object>>{
        if(!Array.isArray(items)){
            throw new Error("Items is not an array");
        }
        if(items.length == 0){
            return [];
        }
        if(typeof items[0] !== "object"){
            items.sort((a, b) => {
                if (a < b) return desc ? 1 : -1;
                if (a > b) return desc ? -1 : 1;
                return 0;
            });
        }else{
            items.sort((a, b) => {
                if (a[field] < b[field]) return desc ? 1 : -1;
                if (a[field] > b[field]) return desc ? -1 : 1;
                return 0;
            });
        }
        return items;
    }
}