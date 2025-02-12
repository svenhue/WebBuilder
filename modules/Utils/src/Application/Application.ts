//@ts-nocheck
import { IApplicationConfiguration } from "./IApplicationConfiguration.js";

import { Container } from "inversify";
import { IStartup } from "../IStartup.js";


export class Application{
    container: Container
    config: IApplicationConfiguration

    constructor(config: IApplicationConfiguration){
        this.config = config;
    }

    public ProvideCreateDIContainer(startup: IStartup){
        const container = new Container() as Container

        startup.InitializeServices(container, this.config)

        this.container = container;
    }
}