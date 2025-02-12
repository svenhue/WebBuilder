import {  UIActionHandler, ViewElement } from 'alphautils';
import { Ref, MaybeRefOrGetter } from 'vue';
import { ITableViewConfiguration } from './TableViewConfiguration.js';
export class TableViewElement extends ViewElement{
    
    declare templateRef: Ref<HTMLElement>;
    
    constructor(config: MaybeRefOrGetter<ITableViewConfiguration>, actionHandler?: UIActionHandler){
        super(config, actionHandler)
    }

    public OpenRowForm(){

    }
    
}