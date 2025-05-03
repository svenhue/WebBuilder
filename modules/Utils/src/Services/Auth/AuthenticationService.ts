//@ts-nocheck
import { inject, injectable } from "inversify";
import { IAuthenticationConfiguration } from "../../Application/Authentication/IAuthenticationConfiguration.js";

import { useIdentityStore } from "../../stores/useIdentityStore.js";
import { AuthenticationMechanism } from "../../Application/Authentication/AuthenticationMechanism.js";
import { IHTTPClientService } from "../../HTTP/IHTTPClientService.js";
import { ICallAbleServiceAction } from "../../ClientActions/Actions/CallService/ICallAbleServiceAction.js";
import { IApplicationConfiguration } from "src/Application/IApplicationConfiguration.js";
import { IUserIdentity } from "../Identity/IUserIdentity.js";

@injectable()
class AuthenticationService implements ICallAbleServiceAction{

    
    private token = undefined;
    private service: IHTTPClientService;
    private config: IAuthenticationConfiguration;

    private store: ReturnType<typeof useIdentityStore>;

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
    public GetToken(): string{
        return this.store.getIdentity()?.access_token
    }
    public isAuthenticated(): boolean{
        return this.store.isAuthenticated()
    }
    public async AuthenticateOAuth2(username: string, password: string, successHandler?: () => void, ErrorHandler?: () => void): Promise<void>{
        const data = await this.RequestToken(username, password);
        this.SetIdentity(data);

        successHandler();
        this.store.setIsAuthenticated(true)
    }
    private SetIdentity(data: IUserIdentity){
        this.store.setIdentity(data)
    }

    private async RequestToken(username: string, password: string): {access_token: string, expires_in: string, token_type: string}{
        const formdata =  
            {
                client_id: 'WebCreator_App', 
                grant_type: 'password',
                client_secret: '',
                username: username,
                password: password,
            };

        const params = new URLSearchParams();

        for(const property in formdata){
            params.append(property, formdata[property]);
        }

        const result = await this.service.sendRequest(
            {
                isCompleteUrl: true,
            url: this.config.tokenEndpoint, 
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'  
            },
            data: params 
            })
        return result.data
    }
}

export { AuthenticationService }