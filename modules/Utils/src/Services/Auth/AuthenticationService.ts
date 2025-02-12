//@ts-nocheck
import { inject, injectable } from "inversify";
import { IAuthenticationConfiguration } from "../../Application/Authentication/IAuthenticationConfiguration.js";

import { useIdentityStore } from "../../stores/useIdentityStore.js";
import { AuthenticationMechanism } from "../../Application/Authentication/AuthenticationMechanism.js";
import { IHTTPClientService } from "../../HTTP/IHTTPClientService.js";
import { ICallAbleServiceAction } from "../../ClientActions/Actions/CallService/ICallAbleServiceAction.js";
import { IApplicationConfiguration } from "src/Application/IApplicationConfiguration.js";

@injectable()
class AuthenticationService implements ICallAbleServiceAction{

    
    private token = undefined;
    private service: IHTTPClientService;
    private config: IAuthenticationConfiguration;

    constructor(
        service: IHTTPClientService,
        config: IAuthenticationConfiguration
    ){
        this.service = service;
        this.config = config
        this.store = useIdentityStore();
    }
    public execute(): void {
        console.log(this)
        this.Authenticate(this.config);
    }
    public Authenticate(config: IAuthenticationConfiguration){
        switch(config.mechanism){
            case AuthenticationMechanism.UserCredentials:
                this.AuthenticateOAuth2();
                break;
            default:
                throw new Error('Unsupported authentication mechanism');
        }
        if(!this.isAuthenticated){
            throw new Error('Authentication failed')
        }
    }
    public isAuthenticated(): boolean{
        return this.store.isAuthenticated
    }
    private AuthenticateOAuth2(username: string, password: string){
        const token = this.RequestToken(username, password);
        this.SetToken(token);
    }
    private SetToken(token: string){
        this.token = token;
    }
    public GetToken(): string{
        return this.token;
    }
    private RequestToken(username: string, password: string): string{
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

export { AuthenticationService }