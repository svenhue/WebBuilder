//@ts-nocheck
import { IViewElement } from '../../../View/IViewElement.js';
import { IUIAction } from '../../IUIAction.js';
import { UIAction } from '../../UIAction.js';
import { ISetValueActionOptions } from './ISetValueActionOptions.js';
import { injectable } from 'inversify';

@injectable()
export class SetValueAction implements IUIAction {
  options: ISetValueActionOptions;

  constructor() {

  }
  override execute() {
   
    return;
  }
}
