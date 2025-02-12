import { ViewElement } from 'alphautils';
import { IWYSIWYGHTMLProperties } from './IWYSIWYGProperties.js';



export class WYSIWYGViewElement extends ViewElement{
    
    declare properties?: IWYSIWYGHTMLProperties;
    declare data?: string;
    constructor(view: WYSIWYGViewElement){
        super(view)
        Object.assign(this,view)
    }
}