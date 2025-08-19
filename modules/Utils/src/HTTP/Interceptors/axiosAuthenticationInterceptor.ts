import { AxiosRequestConfig } from "axios";
import { AuthenticationService } from "../../Services/Auth/AuthenticationService.js";


export function AxiosAuthenticationInterceptor(
    authService: AuthenticationService

) {
    async function intercept(request: AxiosRequestConfig){
        if(!authService.isAuthenticated()){
            await authService.Authenticate()
           
        }
        authService.SetAuthenticationHeader(request);
        return request;
    }

    return {
        intercept
    }
}