//@ts-nocheck
import { inject, injectable } from "inversify";
import { GlobalStateProvider } from "../../../Data/StateManagement/GlobalStateProvider.js";
import { IControlComponentActionConfig } from "./IControlComponentActionConfig.js";
import { IEventInvoker } from "../ClientActions/EventHandler/IEventInvoker.js";
import { IEventReceiver } from "../ClientActions/EventHandler/IEventReceiver.js";
import { EventBus } from "../EventHandler/EventBus.js";
import { IActionConfiguration } from "src/ClientActions/IActionConfiguration.js";


@injectable()
export class ControlComponentAction {
    
    private eventBus: EventBus
    private globals: GlobalStateProvider;
    constructor(
      @inject('EventBus') eventBus,
      @inject('GlobalStateProvider') globalStateProvider: GlobalStateProvider
        
    ){
      this.eventBus = eventBus
      this.globals = globalStateProvider;
       
    }
    override execute(config: IActionConfiguration){
        this.globals.CallState(config.targetElement, config.methodName)
    }
}