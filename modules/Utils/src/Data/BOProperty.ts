import { DataTypes } from './DataTypes.js';

export class BOProperty{
    dataType: DataTypes
    name: string
    value: object

    constructor(bo: BOProperty){
        this.dataType = bo.dataType
        this.name = bo.name
        this.value = bo.value
    }

    GetValue(){
        return this.value;
    }
}