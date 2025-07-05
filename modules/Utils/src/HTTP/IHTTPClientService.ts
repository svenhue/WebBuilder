
import { AxiosResponse } from 'axios';
import { IExternalNetworkConfiguration } from './IExternalNetworkConfiguration.js';
import { IRequestConfig } from './IRequestConfig.js';

export interface IHTTPClientService{
    sendRequest<T>(config: IRequestConfig): Promise<AxiosResponse<T>>; 
    createClient: (config: IExternalNetworkConfiguration) => void;
}