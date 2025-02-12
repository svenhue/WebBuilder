import { Container } from "inversify";
import { IApplicationConfiguration } from "../IApplicationConfiguration.js";

export class DefaultApplicationStartup{

    public Setup(container: Container, config: IApplicationConfiguration){
        container.bind<IApplicationConfiguration>('ApplicationConfiguration').toConstantValue(config);
    }
}