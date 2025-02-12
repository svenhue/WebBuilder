import { IViewElement } from "alphautils";
import { ViewElement } from "alphautils";
import { IRatingViewProperties } from "./IRatingViewProperties.js";

export class RatingViewElement extends ViewElement{

    declare properties: IRatingViewProperties;
    constructor(view: IViewElement) {
        super(view);
    }
}