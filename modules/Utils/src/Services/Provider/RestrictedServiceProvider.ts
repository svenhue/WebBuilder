import { inject, injectable } from "inversify";

@injectable()
export class RestrictedServiceProvider{
    
    public static allowedServices: string[] = [
        'HTTPClientService',
        'DataAdapterConstructor',
        'NavigationService',
    ]
    

    constructor(
     
    ){
     
       
    }

    public Service(service: string){
        if(!RestrictedServiceProvider.allowedServices.includes(service)){
            throw new Error('Service not allowed');
        }

        switch(service){
            
        }
    }
}