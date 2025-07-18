//@ts-nocheck
import { inject, injectable } from "inversify";
import { IAuthenticationConfiguration } from "../../Application/Authentication/IAuthenticationConfiguration.js";
import { IRequestConfig } from "../../HTTP/IRequestConfig.js";
import { useIdentityStore } from "../../stores/useIdentityStore.js";
import { AuthenticationMechanism } from "../../Application/Authentication/AuthenticationMechanism.js";
import { IHTTPClientService } from "../../HTTP/IHTTPClientService.js";
import { ICallAbleServiceAction } from "../../ClientActions/Actions/CallService/ICallAbleServiceAction.js";
import { IApplicationConfiguration } from "src/Application/IApplicationConfiguration.js";
import { IUserIdentity } from "../Identity/IUserIdentity.js";

import { AxiosRequestConfig, METHOD } from "axios"
import { LoggingService } from "src/Logging/LoggingService.js";

@injectable()
abstract class AuthenticationService implements ICallAbleServiceAction{

    
    private config: IAuthenticationConfiguration;
    private store: ReturnType<typeof useIdentityStore>;
    private loggingService: LoggingService
    private httpService: IHTTPClientService;

    constructor(
        config: IAuthenticationConfiguration,
        httpService: IHTTPClientService,
    ){
        this.httpService = httpService;
        this.config = config
        this.store = useIdentityStore();
    }
    public execute(): void {
        this.Authenticate(this.config);
    }
    public async Authenticate(): Promise<void>{
        switch(this.config.mechanism){
            case AuthenticationMechanism.UserCredentials:
                await this.AuthenticateOAuth2();
                break;
            case 2:
                await this.AuthenticateJWT(this.config.username, this.config.password, this.config.tokenEndpoint)
                break;
            default:
                this.loggingService.log({message: "Unsupported authentication mechanism:" +  this.config.mechanism})
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
    private async AuthenticateJWT(emailOrUsername: string, password: string, tokenEndpoint: string, req){
        const body = {
            email: emailOrUsername,
            username: emailOrUsername,
            password: password
        }
        const response = await this.httpService.sendRequest({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: tokenEndpoint,
            data: JSON.stringify(body),
            isolated: true
        }, true)
        console.log("Response from authentication:", response, body, tokenEndpoint)
        const token = response.data['access_token'] ?? false;

        if(!token){
           // this.loggingService.log({message:"Error during authentication: Could not find acces_token" })
            throw new Error("Error during authentication: Could not find acces_token")
        }
        this.store.setIsAuthenticated(true)
        this.store.setIdentity(response.data)
    }
    public SetAuthenticationHeader(request: AxiosRequestConfig){
        if(this.GetToken() == undefined) throw new Error("No token found, please authenticate first");
        request.headers.Authorization = `Bearer ${this.GetToken()}`;
    }
    public async setAuthRequestConfigInterceptor(request: IRequestConfig){
        if(this.isAuthenticated()){
            if(!request?.headers){
                request.headers = {}
            }
            request.headers['Authorization'] = `Bearer ${this.GetToken()}`
        }else {
            await this.Authenticate(this.config, request)
        }
    }

    public async RequestToken(username: string, password: string): Promise<{access_token: string, expires_in: string, token_type: string}>{
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

        const result = await this.httpService.sendRequest<{
            access_token: string, 
            expires_in: string, 
            token_type: string
        }>(
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