import { INode } from "./node.js";
import nodes from "./nodes.js";
import { TaskTypes } from "./Tasks/TaskTypes.js";

export class NodeFactory{

    public createNode(node: INode): INode{
        switch(node.type.namespace){
            case TaskTypes["JavaScript.Query"]:
                return new nodes.JavascriptQueryTask(node);
            case TaskTypes["JavaScript.Code"]:
                return;
            case "core.sortnode":
                return new nodes.SortNode(node);
        }
    }
}