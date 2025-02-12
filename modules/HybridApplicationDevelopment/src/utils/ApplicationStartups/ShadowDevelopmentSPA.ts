import { EventBus,CallLocalMethodAction,GlobalStateProvider,ControlComponentAction, SendRequestAction, SetValueAction, SetValuesAction,  UIActionFactory, BORepository, IApplicationConfiguration, IStartup, Screen, HTTPClientService } from "alphautils";
import { BOService } from "alphautils";

import { Container } from "inversify";

export class ShadowDevelopmentSPA implements IStartup{

    test(container: Container, config: IApplicationConfiguration): void {
        
        container.bind<BORepository>("BORepository").to(BORepository).inSingletonScope();
        container.bind<Screen>("Screen").to(Screen).inSingletonScope();
        container.bind<BOService>("BOService").to(BOService).inSingletonScope();
        container.bind<IApplicationConfiguration>("ApplicationConfiguration").toConstantValue(config);
        container.bind<EventBus>("EventBus").to(EventBus).inSingletonScope();


        // remove this factory from this scope and use factory provided by the application?
        container.bind<UIActionFactory>("UIActionFactory").to(UIActionFactory).inSingletonScope();

        //actions

        container.bind<{ new(): SendRequestAction }>('SendRequestActionConstructor').toConstructor(SendRequestAction),
        container.bind<{ new(): SetValueAction }>('SetValueActionConstructor').toConstructor(SetValueAction),
        container.bind<{ new(): SetValuesAction }>('SetValuesActionConstructor').toConstructor(SetValuesAction),
        container.bind<{new (): ControlComponentAction}>("ControlComponentActionConstructor").toConstructor(ControlComponentAction);
        container.bind<CallLocalMethodAction>("CallLocalMethodActionConstructor").toConstructor(CallLocalMethodAction);

        container.bind<GlobalStateProvider>("GlobalStateProvider").to(GlobalStateProvider).inSingletonScope();
        
    }
}