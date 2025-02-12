import { SimpleNameValueCollection } from "../../Data/SimpleNameValueCollection.js";
import { IEventInvoker } from "./IEventInvoker.js";
import { IUIEvent } from "./IUIEvent.js";
import { IUIAction } from "../IUIAction.js";

export interface IEventHandler{

    identifier: string;
    handleEvent(sender:IEventInvoker, event: IUIEvent, args: SimpleNameValueCollection): void;
    GetActions(): Array<IUIAction>;
}