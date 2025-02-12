//@ts-ignore
import { IUIEvent } from "../../ClientActions/EventHandler/IUIEvent.js";
import { IUIAction } from "../../ClientActions/IUIAction.js";

export interface IViewInteraction{
    events: Array<IUIEvent>;
    actions: Array<IUIAction>
}