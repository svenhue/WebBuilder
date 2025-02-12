import { INode, Node } from "src/node.js";
import { IWorkflowConfiguration } from "./workflow.core/IWorkflowConfiguration.js";
import { NodeFactory } from "src/NodeFactory.js";
import { WorkflowStatus } from "./workflow.core/WorkflowStatus.js";
import { IRuntimeEnvironment } from "src/environment/IRuntimeEnvironment.js";
import { IWorkflowResult } from "./workflow.core/IWorkflowResult.js";

export class Workflow{

    private config: IWorkflowConfiguration;
    private status: WorkflowStatus;

    constructor(config: IWorkflowConfiguration){
        this.config = config;
    }

    public async start(env: IRuntimeEnvironment): Promise<IWorkflowResult>{
        this.status = WorkflowStatus.Running;

        let currentNodeConfig = this.getNextNode(undefined);  
        let currentNode = this.buildNode(currentNodeConfig);

        while(this.status === WorkflowStatus.Running){
            const result = await env.execNode(currentNode)
            currentNodeConfig = this.getNextNode(currentNodeConfig);
            
            if(currentNodeConfig == null){
                this.status = WorkflowStatus.Completed;
                break;
            }
            currentNode = this.buildNode(currentNodeConfig);
            
        }
        if(this.status == WorkflowStatus.Running){
            this.status = WorkflowStatus.Completed;
        }
        return {
            status: this.status,
            data: env.getData()
        }
    }

    private buildNode(node: INode): Node{
        if(node == undefined){
            return undefined
        }
        if(node.input == undefined){
            node.input = {}
        }
        return NodeFactory.createNode(node);
    }

    private getNextNode(node: INode): INode | undefined{
        if(node == undefined){
            const startNode = this.config.nodes.find(n => n.isStartNode == true);
            if(startNode == undefined){
                throw new Error("No start node found");
            }
            return startNode;
        }
        const connector = this.config.connectors?.find(c => c.startNodeId === node.runId);
        if(connector == undefined){
            return null
        }
        const targetNode = this.config.nodes.find(n => n.runId === connector.endNodeId);

        if(targetNode == undefined){
            throw new Error(`Target node ${targetNode.id} of connector ${connector.id} not found`);
        }
        return targetNode;
    }


}