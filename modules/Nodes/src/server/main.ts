import "reflect-metadata";
import { Request, Response } from "express";
import * as bodyParser from 'body-parser';
import { BaseRuntimeEnfironment } from "src/environment/BaseRuntimeEnvironment";
import { WorkflowValidator } from "src/Workflow/workflow.core/WorkflowValidator";


const express = require('express') 

const app =express();
app.use(bodyParser.json());
app.use(express.static("public"))
const port = 3000

app.post('/startWorkflow', async (req: Request, res: Response) => {
    
    try{
        const config = req.body["workflowConfig"];
        const isValid = WorkflowValidator.validateWorkflow(config);
        if(!isValid){
            throw new Error("Invalid workflowconfiguration");
        }
        const env = new BaseRuntimeEnfironment();
        env.start()
        await env.startWorkflow(config).then((result) => {
            res.status(200).send(result);
        });
    }catch(error){

        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});