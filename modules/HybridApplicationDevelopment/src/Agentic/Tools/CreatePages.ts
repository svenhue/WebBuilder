import { ITool } from "agenticBusinessIntegration";

export class CreatePagesTool implements ITool{

    public name: string = "CreatePagesTool";
    public description: string = "Create a new page in the website";
    public input_schema = {
        required: ['']
    }

    constructor(){
        navigator.mediaDevices.getDisplayMedia
    }
}