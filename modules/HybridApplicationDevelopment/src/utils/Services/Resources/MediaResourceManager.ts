//@ts-ignore
import { injectable, inject } from "inversify";
import { MediaResourceTypes } from "./MediaResourceTypes";
import { IHTTPClientService, IRequestConfig } from "alphautils";

@injectable()
export class MediaResourceManager{
    
    private httpService: IHTTPClientService
    constructor(
        @inject("HTTPClientService") httpService: IHTTPClientService
    ){
        this.httpService = httpService
    }
    public UploadResource(resourceType: MediaResourceTypes, src: string, files){
        console.log("UploadResource", resourceType, src, files)
        const formData = new FormData()
        const requestConfig = {
            url: "NuxtApplicationBuilder/ResourceUpload",
            method: "POST",
            networkname: "WebCreatorBackend",
            data: formData,
        } as IRequestConfig
        
        return new Promise((resolve, reject) => {
            this.httpService.sendRequest(requestConfig)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        });
    }
}