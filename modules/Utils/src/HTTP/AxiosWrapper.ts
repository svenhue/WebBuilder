//@ts-nocheck
import { IExternalNetworkConfiguration } from './IExternalNetworkConfiguration.js';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { IRequestConfig } from './IRequestConfig.js';

export class AxiosWrapper{
    instance?: AxiosInstance;
    config: IExternalNetworkConfiguration;

    constructor(config: IExternalNetworkConfiguration){
        this.config = config;
        this.setup(config);
        
    }

    private setup(config: IExternalNetworkConfiguration){
        this.instance = axios.create({
            baseURL: config.url,
            headers: config?.headers,
            data: config?.data
        })
    }
    public async Get(url: string, config?: AxiosRequestConfig, callback?: (response: AxiosResponse) => void){
        
        return this.instance?.get(url, config).then((response: AxiosResponse) => {
            
            if(callback != undefined){
                callback(response);
            }
            return response;
        }).catch((error: AxiosError) => {
                
                return error;
        }).finally((r) => {
                return;
        });
            
    }
    public Post(url: string, config?: AxiosRequestConfig, callback?: () => void){
        return this.instance?.post(url, config?.data, config).then((response: AxiosResponse) => {
            
            if(callback != undefined){
                callback(response);
            }
            return response;
        }).catch((error: AxiosError) => {
                return error;
        }).finally((r) => {
                return r;  
        });
    }
    public Put(url: string, config?: AxiosRequestConfig){
        return this.instance?.put(url,config);
    }
    public Delete(url: string, config?: AxiosRequestConfig){
        return this.instance?.delete(url,config);
    }
    private createAxiosConfig(options: IRequestConfig): AxiosRequestConfig{
        const config: AxiosRequestConfig = {
            url: options.url,
            method: options.method,
            headers: options?.headers,
            data: options?.data
        }
        return config;
    }
    public async sendRequest(options: IRequestConfig, callback?: (response: AxiosResponse) => Promise<AxiosResponse>){
        const config = this.createAxiosConfig(options);
        let url;

        if(options?.isCompleteUrl || options?.isolated){
            url = options.url;
        }else{
            url = this.config.url + options.url;
        }
        switch(options?.method){
            case "GET":
                return await this.Get(url, config, callback);
                break;
            case "POST":
                return this.Post(url,config);
                break;
            case "PUT":
                return this.Put(url,config);
                break;
            case "DELETE":
                return this.Delete(url,config);
                break;
            default:
                throw new Error("Method" + options.method + "not supported!")
        }

    }
    

}