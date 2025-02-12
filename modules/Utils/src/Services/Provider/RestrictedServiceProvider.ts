import { inject, injectable } from "inversify";
import { BaseServiceProvider } from "./BaseServiceProvider";
import { NavigationService } from "../Navigation/NavigationService";
import { AuthenticationService } from "../Auth/AuthenticationService";

@injectable()
export class RestrictedServiceProvider{
    
    public static allowedServices: string[] = [
        'HTTPClientService',
        'AuthenticationService',
        'DataAdapterConstructor',
        'NavigationService',
    ]
    

    constructor(
        @inject('AuthenticationService') private authenticationService: AuthenticationService,
    ){
        this.authenticationService = authenticationService;
       
    }

    public Service(service: string){
        console.log(service)
        if(!RestrictedServiceProvider.allowedServices.includes(service)){
            throw new Error('Service not allowed');
        }

        switch(service){
            case 'NavigationService':
                return new NavigationService();
            case 'AuthenticationService':
                return this.authenticationService
        }
    }
}