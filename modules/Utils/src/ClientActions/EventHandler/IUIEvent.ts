import { IUIAction } from '../IUIAction.js';
import { UIEventTypes } from './UIEventTypes.js';
import { UIEvents } from './UIEvents.js';

export interface IUIEvent {
  id: number;
  identifier: UIEvents | string;
  type: UIEventTypes
  action: IUIAction
  targetElement: string
}
