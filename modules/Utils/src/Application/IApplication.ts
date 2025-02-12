import { App } from "vue"
import { Router } from "vue-router"
import { IApplicationConfiguration } from "./IApplicationConfiguration.js"
import { BusinessObject } from "../Data/BusinessObject.js"
import { IApplicationModule } from "./IApplicationModule.js"
import { IStartup } from "./IStartup.js"

export interface IApplication{
    rootApp?: App
    vueRouter: Router
    config: IApplicationConfiguration
    factory: object
    boDeclarations: Array<BusinessObject>

    RegisterModule(module: IApplicationModule): void
    
    AddMiddleware(middleware: object): void

    mount(): void
    build(): IApplication;
    setup(): IApplication
    useStartup(startup: IStartup): IApplication

    
}