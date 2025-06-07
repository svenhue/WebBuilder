import { BaseServiceProvider } from "../Provider/BaseServiceProvider.js"
import { AuthenticationService } from "./AuthenticationService.js"

export function AuthenticationMiddleware(to, from) {

    
    return;
    if(to.meta?.auth?.requiresAuth == true){
        const service = BaseServiceProvider.Service<AuthenticationService>("AuthenticationService") as AuthenticationService;
        if(!service.isAuthenticated()){
            return to.meta.auth.redirect ?? '/login';
        }
    }
    
};