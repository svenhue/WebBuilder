//import { type IExecutionContextProvider, CodeExecutor } from "webbuilderalphautils";
import { ITask } from "../core/ITask.js";
import { ITaskInput } from "../core/ITaskInput.js";
import { ITaskResult } from "../core/ITaskResult.js";

import { INodeType } from "../../node.core/INodeType.js";
import { NodeTypes } from "../../node.core/NodeTypes.js";
import { TaskTypes } from "../TaskTypes.js";
import { NodeStatus } from "../../node.core/NodeStatus.js";
import { Node } from "../../node.js";

export class JavascriptQueryTask extends Node implements ITask {

    public codeValue: string;
    public environment: Object;
    public contextid: number;

    public static type: INodeType = {
        namespace: "query.javascript",
        name: TaskTypes["JavaScript.Query"],
        type: NodeTypes.query
    } 
    constructor(
        input: ITask
    ){
        super(input);
        this.codeValue = input?.input?.codeValue;
        this.environment = input?.input?.environment as IExecutionContextProvider;
        this.contextid = input?.input?.contextid;
    }


    public InputIsValid(): boolean {
        //validate input
        if(this.codeValue == undefined || this.codeValue == ""){
            return false;
        }
        if(this.environment == undefined){
            return false
        }
        if(this.contextid == undefined){
            return false
        }
        return true;
    }

    public async Execute(): Promise<ITaskResult> {
        //execute query
        let result = null;
        try{
               result = CodeExecutor(this.environment, this.contextid, this.codeValue);
                return {
                     status: NodeStatus.Completed,
                     output: result.value
                } as ITaskResult
        }catch(err)  {
            return {
                status: NodeStatus.Failed,
                errorMessage: err
            } as ITaskResult
        }
    }

    
}