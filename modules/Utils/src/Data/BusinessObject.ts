import { BOProperty } from './BOProperty.js';

export class BusinessObject{
    
    propertys?: Array<BOProperty>;
    name: string;

    constructor(bo?: BusinessObject){
        this.name = bo.name;
        this.propertys = bo.propertys;
    }


    public static UnkownBO(name: string){
        return new BusinessObject({
            name: name
        })
    }
}