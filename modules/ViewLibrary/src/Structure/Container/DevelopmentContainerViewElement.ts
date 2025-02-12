import { IViewElement } from 'alphautils';
import { ContainerViewElement } from './ContainerViewElement.js';

export class DevelopmentContainerViewElement extends ContainerViewElement{
    constructor(view: IViewElement, config: object){
        super(view, config);
    }
}