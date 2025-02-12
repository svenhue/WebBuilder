import { BOProperty } from "../Data/BOProperty.js";
import { BusinessObject } from "../Data/BusinessObject.js";

export class BODeclarationContainer {
    
    boTypes: Array<BusinessObject>;
    
    constructor() {
        this.boTypes = [];
    }

    AddBOType(boType: BusinessObject) {
        this.boTypes.push(boType);
    }
    AddBOTypes(boTypes: Array<BusinessObject>) {
        this.boTypes = boTypes;
    }
    CreateBOType(name: string, propertys: Array<BOProperty>) {
        const boType = new BusinessObject();
        boType.name = name;
        boType.propertys = propertys;
        this.boTypes.push(boType);
    }
}   