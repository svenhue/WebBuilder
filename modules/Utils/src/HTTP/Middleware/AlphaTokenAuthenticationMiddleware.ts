//@ts-nocheck
import { inject, injectable } from "inversify";
import { IRequestConfig } from "../IRequestConfig.js";
import { HTTPClientService } from "../HTTPClientService.js";

@injectable()
export class AlphaTokenAuthenticationMiddleware{
    
    private tokenEndpoint: string = 'https://localhost:44369/connect/token/?grant_type=client_credentials';
    private authEndpoint: string = 'https://localhost:44369/connect/authorize'

    private service: HTTPClientService
    constructor(
        @inject('HTTPClientService') service: HTTPClientService
    ){
        this.service = service;
    }


    public handle(request: IRequestConfig){
        

        if(request.headers['username'] == undefined || request.headers['password'] == undefined)
            throw new Error('Username and password must be provided in the request headers')

        const token = this.GetToken(request.headers['username'], request.headers['password'])

        if(token == undefined || token == ''){
            throw new Error('Token could not be retrieved')
        }
        request.data.headers['Authorization'] = 'Bearer ' + token
        return request;
    }

    public GetToken(username: string, password: string): string{
        const formdata =  
            {
                client_id: 'WebCreator_App', 
                grant_type: 'password',
                client_secret: '',
                username: username,
                password: password,
            };

        const formBody = [];

        for(const property in formdata){
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(formdata[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }

        const result = this.service.sendRequest(
            {
            url: this.tokenEndpoint, 
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'  
            },
            data: formBody.join('&')
            })
            console.log(result)
        return result.data['access_token']
            
    }


}