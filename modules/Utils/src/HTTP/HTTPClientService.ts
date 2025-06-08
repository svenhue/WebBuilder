//@ts-nocheck
import { AxiosWrapper } from '../HTTP/AxiosWrapper.js';
import { IExternalNetworkConfiguration } from '../HTTP/IExternalNetworkConfiguration.js';
import { IHTTPClientService } from './IHTTPClientService.js';
import { AxiosResponse } from 'axios';
import { IRequestConfig } from './IRequestConfig.js';
import { inject, injectable } from 'inversify';
import { AuthenticationService } from '../Services/Auth/AuthenticationService.js';

@injectable()
export class HTTPClientService implements IHTTPClientService{
    
    public networks: Array<IExternalNetworkConfiguration> = Array<IExternalNetworkConfiguration>();;
    private authService: AuthenticationService;
    clients: Array<AxiosWrapper>;

    constructor(
    ){
        this.clients = Array<AxiosWrapper>();

    }
    private createClient(config: IExternalNetworkConfiguration){
        const client = new AxiosWrapper(config);
        return client
    }
    private GetOrCreateClient(request: IRequestConfig): AxiosWrapper
    {
        if(request?.isolated){
            return this.createClient(request)
        }
        let client = this.clients.find((client) => {
            return request.url.includes(client.config.url);
        })
        if(client == undefined){
            let network = this.networks.find((network) => {
                return request.url?.includes(network?.url) || request?.networkname == network.name ;
            })
            const isAuthNetwork = this.networks.find((network) => {
                return network.authentication != undefined && request.url == network.authentication.tokenEndpoint;
            })
            if(network == undefined && isAuthNetwork == undefined){
                throw new Error('No network found with name: ' + request.networkname)
            }
            
            if(network == undefined){
                network = {
                    url: request.url,
                    name: request.networkname,
                    headers: isAuthNetwork.headers
                }
            }
            if(request.url != undefined){
                
            }
            client = this.createClient(network);
            this.clients.push(client); 
        }
        return client;
    }

    public async sendRequest<T = {}>(request: IRequestConfig): AxiosResponse<T>{
        console.log(123, request)
        const client = this.GetOrCreateClient(request);
        const result = await client.sendRequest(request) as Promise<AxiosResponse>;

        if(this.AuthenticationFailed(result)){
            this.authService.Authenticate(this.GetAuthConfig(request))
        }
       
        return result;
    }
    private AuthenticationFailed(response: AxiosResponse){
        return response?.status == 401;
    }
    private GetAuthConfig(request: IRequestConfig){
        const network = this.networks.find((network) => {
            return network.name == request.networkname;
        })
        if(network == undefined){
            throw new Error('No network found with name: ' + request.networkname)
        }
        return network.authentication;
    }
    public Create(value: object, networkName: string){
        const client = this.GetOrCreateClient({networkname: networkName, method: 'POST'});
        return client.sendRequest({url: '', method: 'POST', data: value, networkname: networkName});
    }
}