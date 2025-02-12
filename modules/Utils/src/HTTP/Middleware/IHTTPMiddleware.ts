import { IRequestConfig } from "../IRequestConfig";

export interface IHTTPMiddleware {

    handle(request: IRequestConfig): any;
}