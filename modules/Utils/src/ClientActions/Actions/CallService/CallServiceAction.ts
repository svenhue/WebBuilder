import { RestrictedServiceProvider } from "../../../Services/Provider/RestrictedServiceProvider.js";
import { UIAction } from "../../UIAction.js";
import { ICallServiceActionConfig } from "./ICallServiceActionConfig.js";
import { inject, injectable } from "inversify";

@injectable()
export class CallServiceAction extends UIAction<ICallServiceActionConfig>{

    private serviceProvider: RestrictedServiceProvider;
    constructor(
        @inject("RestrictedServiceProvider")serviceProvider: RestrictedServiceProvider){
        super();
        this.serviceProvider = serviceProvider;
    }

    public override execute(config: ICallServiceActionConfig){
        this.config = config;
        const service = this.serviceProvider.Service(this.config.service);

        if(service == undefined){
            throw new Error(`Service ${this.config.service} not found`)
        }
        service['execute'](config);

        
    }
}