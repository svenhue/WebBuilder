import { IEventHandler } from '../ClientActions/EventHandler/IEventHandler.js';
import { IBaseView } from './IBaseView.js';
import { IViewConfiguration } from './IViewConfiguration.js';

export interface IViewElement extends IBaseView, IEventHandler{
    configuration: IViewConfiguration
}