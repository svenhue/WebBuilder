import { INode } from "src/node.js";
import { WorkflowEnvironments } from "./WorkflowEnvironments.js";
import { INodeConnector } from "./INodeConnector.js";

export interface IWorkflowConfiguration{
    environment: WorkflowEnvironments;
    nodes: Array<INode>;
    connectors: Array<INodeConnector>
    initialData?: Object
}