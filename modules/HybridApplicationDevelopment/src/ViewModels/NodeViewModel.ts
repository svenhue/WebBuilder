import { computed, ComputedRef, ref, Ref } from "vue";
import { NodeFactory, type INode} from "alphanodes"
import { TaskTypes } from "alphanodes/src/Tasks/TaskTypes";
export class NodeViewModel{

    private _contextId: number
    private _nodes: Ref<Array<INode>>
    private _nodeFactory: NodeFactory = new NodeFactory();

    constructor(contextId: number, nodes: Array<INode>){
        this._contextId = contextId;
        this._nodes = ref(new Array<INode>());

        for(const node of nodes){
            console.log(node, this.ProduceNode(node));
            this._nodes.value.push(this.ProduceNode(node));
        }
    }

    public getAll(): ComputedRef<Array<INode>>{
        return computed(() => {
            return this._nodes.value;
        });
    }

    public UpdateNodeType(nodeId: string, type: TaskTypes){
        const nodeIx = this.getAll().value.findIndex(n => n.id == nodeId)
        this._nodes.value[nodeIx].type['name'] = type;
    }

    public ProduceNode(node: INode): INode{
        return this._nodeFactory.createNode(node);
    }
}