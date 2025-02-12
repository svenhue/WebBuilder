import { IViewElement } from 'alphautils';

export interface ITab extends IViewElement{
    name: string;
    icon: string;
    label: string;
    view: IViewElement;
}