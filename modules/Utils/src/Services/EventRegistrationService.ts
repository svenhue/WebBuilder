import { inject, injectable } from "inversify";
import { EventBus } from "../ClientActions/EventHandler/EventBus.js";
import { IUIEvent } from "src/ClientActions/EventHandler/IUIEvent.js";
import { IEventHandler } from "src/ClientActions/EventHandler/IEventHandler.js";
import { SimpleNameValueCollection } from "src/Data/SimpleNameValueCollection.js";

@injectable()
export class EventRegistrationService{
    
    private eventBus: EventBus;

    constructor(
        @inject("EventBus") eventBus: EventBus
    ){
        this.eventBus = eventBus;
    }

    registerEvent(event: IUIEvent, handler: IEventHandler, args?: SimpleNameValueCollection){
        this.eventBus.on(event, handler, args);
    }
}