import { IUIEvent } from "./IUIEvent.js";
import { IUIAction } from "../IUIAction.js";

export interface IEventInvoker extends Event{
    events: Array<IUIEvent> | undefined;
    actions: Array<IUIAction | undefined>
}