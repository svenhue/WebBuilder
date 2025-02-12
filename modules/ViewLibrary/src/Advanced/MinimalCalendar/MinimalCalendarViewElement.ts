import { ViewElement } from'alphautils';
import { IMinimalCalendarProperties } from './IMinimalCalendarProperties.js';
import { IViewElement } from 'alphautils';

export class MinimalCalendarViewElement extends ViewElement{

    declare public properties?: IMinimalCalendarProperties;

    constructor(view: IViewElement){
        super(view)
    }
}