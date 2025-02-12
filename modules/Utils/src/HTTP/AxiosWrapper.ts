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
            data: config.data
        })
    }
    public Get(url: string, config?: AxiosRequestConfig, callback?: (response: AxiosResponse) => void){
        
        return this.instance?.get(url + config.url, config).then((response: AxiosResponse) => {
            
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
    public Post(url: string, config?: AxiosRequestConfig){
        return this.instance?.post(url,JSON.parse(JSON.stringify(config.data)),config);
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
            headers: options.headers,
            data: options.data
        }
        return config;
    }
    public sendRequest(options: IRequestConfig, callback?: (response: AxiosResponse) => Promise<AxiosResponse>){
        const config = this.createAxiosConfig(options);
        try{
            switch(options.method){
                case "GET":
                    return this.Get(this.config.url, config, callback);
                case "POST":
                    return this.Post(this.config.url + options.url,config);
                case "PUT":
                    return this.Put(this.config.url,config);
                case "DELETE":
                    return this.Delete(this.config.url,config);
            }
        }catch(error){
            console.log(error)
            return error;
        }
    }
    

}