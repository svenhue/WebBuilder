import { Method } from "axios";

export interface IRequestConfig{
    method: Method;
    url?: string;
    headers?: object;
    networkname?: string;
    data?: object;
}