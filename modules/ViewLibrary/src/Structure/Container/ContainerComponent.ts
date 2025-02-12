import { IApplicationComponent, VueApplicationComponent } from "alphautils";

export class ContainerComponent extends VueApplicationComponent implements IApplicationComponent{
    constructor() {
        super(undefined, ContainerComponent);
    }

}