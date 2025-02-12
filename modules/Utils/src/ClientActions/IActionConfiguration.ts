import { UIActionTypes } from './UIActionTypes.js';

export interface IActionConfiguration {
  type: UIActionTypes;
  methodName: string,
  targetElement: string,
  identifier: string // todo guuid
}
