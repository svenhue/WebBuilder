import { SimpleNameValueCollection } from "../../Data/SimpleNameValueCollection.js";
import { IEventHandler } from "./IEventHandler.js";
import { IUIEvent } from "./IUIEvent.js";

export interface IEventBusEntry{
    event: IUIEvent;
    handler: IEventHandler;
    args: SimpleNameValueCollection
    abortController?: AbortController
}