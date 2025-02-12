import { IViewElement } from 'alphautils';
import { ViewElement } from 'alphautils';
import { ICheckboxProperties } from './ICheckboxProperties.js';

export class CheckBoxViewElement extends ViewElement{

    public properties?: ICheckboxProperties;
    constructor(view: IViewElement){
        super(view);
    }

}