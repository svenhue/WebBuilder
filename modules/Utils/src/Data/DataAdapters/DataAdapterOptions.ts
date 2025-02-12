import { SubscriptionScopes } from "./SubscriptionScopes.js";
import { BusinessObject } from "../BusinessObject.js";
import { PublishScopes } from "./PublishScopes.js";
import { GlobalDataSynchronizeOptions } from "./GlobalDataSynchronizeOptions.js";

export class DataAdapterOptions{
    apiDefinition: GlobalDataSynchronizeOptions
    subscribe?:{
        scope: SubscriptionScopes
    }
    publish?:{
        scope: PublishScopes
    }
    contextId: number  
    persistLocalStorage?: boolean
    persistGlobalStorage?: boolean
    boType: BusinessObject

    constructor(options: DataAdapterOptions){
        Object.assign(this, options)
    }




}