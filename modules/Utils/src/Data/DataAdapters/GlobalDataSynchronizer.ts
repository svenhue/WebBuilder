import { inject, injectable } from "inversify";
import { HTTPClientService } from "../../HTTP/HTTPClientService.js";
import { StateChangeTypes } from "../Repositorys/StateChangeTypes.js";
import { GlobalDataSynchronizeOptions } from "./GlobalDataSynchronizeOptions.js";
import { IRequestConfig } from "../../HTTP/IRequestConfig.js";
import { APITypes } from "./APITypes.js";
import { Method } from "axios";


@injectable()
export class GlobalDataSynchronizer{

    private httpService: HTTPClientService

    constructor(
        @inject("HTTPClientService") httpService: HTTPClientService){
        this.httpService = httpService
    }

    public async SyncData(value: object, changeType: StateChangeTypes, options: GlobalDataSynchronizeOptions){
        switch(options.type){
            case APITypes.REST:
                const request = this.CreateRESTRequest(value, changeType, options.url, options.networkname)
                this.httpService.sendRequest(request)
                break;
            default: 
                throw new Error('API Type not supported: ' + options.type)
        }
    }
    private CreateRESTRequest(value: object, changeType: StateChangeTypes, url: string, networkname: string): IRequestConfig{
        return {
            url: url,
            networkname: networkname,
            method: this.CreateRestMethod(changeType),
            headers: {
                "Content-Type": "application/json"
            },
            data: value
        }
    }
    private CreateRESTRequestData(){
        //todo use object builder from iboinstance (remnove prop BoName, id int)
        //todo use object builder for viewconfig
    }
    private CreateRestMethod(changeType: StateChangeTypes): Method{
        switch(changeType){
            case StateChangeTypes.create:
                return "POST"
            case StateChangeTypes.update:
                return "PUT"
            case StateChangeTypes.delete:
                return "DELETE"
        }
    }
}