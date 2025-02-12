import { IActionConfiguration } from "./IActionConfiguration.js";
import { IEventInvoker } from "./EventHandler/IEventInvoker.js";
import { IUIEvent } from "./EventHandler/IUIEvent.js";
import { UIActionTypes } from "./UIActionTypes.js";
import { IEventReceiver } from "./EventHandler/IEventReceiver.js";

export interface IUIAction{
  id: number,
  config: IActionConfiguration
  name: string;
  identifier: string;
  type: UIActionTypes
  targetElement?: string // publicIdentifier of target component
  method?: string // method to call on target component
  execute: (config: IActionConfiguration, sender: IEventInvoker) => void;
}
