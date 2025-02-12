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
        let client = this.clients.find((client) => {
            return client.config.name == request.networkname;
        })
        if(client == undefined){
            const network = this.networks.find((network) => {
                return network.name == request.networkname;
            })
            if(network == undefined){
                throw new Error('No network found with name: ' + request.networkname)
            }
            client = this.createClient(network);
            this.clients.push(client); 
        }
        return client;
    }

    public async sendRequest<T = {}>(request: IRequestConfig): AxiosResponse<T>{
        console.log(this.networks)
        const client = this.GetOrCreateClient(request);
        const result = await client.sendRequest(request) as Promise<AxiosResponse>;

       
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