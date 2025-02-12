import { NodeStatus } from "src/node.core/NodeStatus.js";
import { INode } from "src/node.js";
import { IWorkflow } from "src/Workflow/workflow.core/IWorkflow.js";
import { IWorkflowConfiguration } from "src/Workflow/workflow.core/IWorkflowConfiguration.js";
import { Workflow } from "src/Workflow/Workflow.js";
import { IRuntimeEnvironment } from "./IRuntimeEnvironment.js";
import { DataContainer } from "./DataContainer.js";

export class BaseRuntimeEnfironment implements IRuntimeEnvironment{

    private nodes: Array<INode> = [];
    private isReady: boolean = false;
    private workflow: IWorkflow;

    public dataContainer: DataContainer

    constructor(){

    }

    public start(){
        this.isReady = true;
    }

    public stop(){
        this.isReady = false;
    }

    public async startWorkflow(config: IWorkflowConfiguration){
        if(!this.isReady){
            throw new Error("Runtime environment is not ready");
        }
        this.workflow = new Workflow(config);
        this.dataContainer = new DataContainer(config.initialData);

        return await this.workflow.start(this);
    }
    public getData(){
        return this.dataContainer
    }
    public async execNode(node: INode){
        
        node.input.data = this.dataContainer
        const result = await node.Execute();
        return result;
    }
}