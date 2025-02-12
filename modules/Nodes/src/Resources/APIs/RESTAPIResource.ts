import { injectable } from "inversify";
import { IResource } from "../resources.core/IResource.js";
import { type IHTTPClientService } from "webbuilderalphautils";
import { IRequestConfig } from "webbuilderalphautils";
import { IResourceResult } from "../resources.core/IResourceResult.js";
import { Node } from "../../node.js";
import { INodeType } from "../../node.core/INodeType.js";
import { NodeTypes } from "../../node.core/NodeTypes.js";

@injectable()
export class RESTAPIResource extends Node implements IResource{
    
    private _clientService: IHTTPClientService;
    
    public static type: INodeType = {
        namespace: "resource.restapi",
        name: "Resource.RESTAPIU",
        type: NodeTypes.resource
    } 
    
    constructor(
        input: IResource,
        clientService: IHTTPClientService
    ){
        super(input)

        if(clientService == undefined){
            throw new TypeError("clientService is undefined");
        }
        this._clientService = clientService;
    }
    
    public GetActions(){
        return ["GET", "POST", "PUT", "DELETE"];
    }

    public async ExecuteAction(input: IResource): Promise<IResourceResult> {
       
        const config = {
            method: input.input["method"],
            url: input.input["baseUrl"],
            data: input.input["body"],
            headers: input.input["headers"],
            networkname: input.input["networkname"]
        } as IRequestConfig
        try{
            const result = await this._clientService.sendRequest(config);
            return {
                status: result.status.toString(),
                output: {
                    value: result.data
                }
            }
        }catch(err){
            return {
                status: err.response.status.toString(),
                output: {
                    value: err.response.data
                }
            }
        }
        
    }
}