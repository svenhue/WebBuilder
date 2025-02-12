import { IViewElement } from "alphautils";
import { ViewElement } from "alphautils";
import { ITreeProperties } from "./ITreeProperties.js";

export class TreeViewElement extends ViewElement{

    declare data: Array<object>;
    declare properties?: ITreeProperties;
    constructor(view: IViewElement){
        super(view);
    }

}