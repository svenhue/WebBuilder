import { IViewElement } from 'alphautils';
import { ITab } from './ITab.js';

//todo extzends route definition from hybidappdev
export interface IRoutableTab extends ITab{
    name: string;
    icon: string;
    label: string;
    view: IViewElement;
}