import { AxiosRequestConfig } from "axios";
import { AuthenticationService } from "../../Services/Auth/AuthenticationService.js";


export function AxiosAuthenticationInterceptor(
    authService: AuthenticationService

) {
    async function intercept(request: AxiosRequestConfig){
        console.log("hello interceptors")
        if(!authService.isAuthenticated()){
            await authService.Authenticate()
           
        }
        authService.SetAuthenticationHeader(request);
        console.log(request, request.headers)
        return request;
    }

    return {
        intercept
    }
}