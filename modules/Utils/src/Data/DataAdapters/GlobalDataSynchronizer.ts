import { inject, injectable } from "inversify";
import { HTTPClientService } from "src/HTTP/HTTPClientService";
import { StateChangeTypes } from "../Repositorys/StateChangeTypes";
import { GlobalDataSynchronizeOptions } from "./GlobalDataSynchronizeOptions";
import { IRequestConfig } from "../../HTTP/IRequestConfig";
import { APITypes } from "./APITypes";


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
                const result = await this.httpService.sendRequest(request)
                console.log(result)
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
    private CreateRestMethod(changeType: StateChangeTypes): string{
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