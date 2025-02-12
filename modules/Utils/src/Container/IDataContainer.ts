import { Ref } from 'vue';
import { BusinessObject } from '../Data/BusinessObject.js';
import { IBOInstance } from 'src/Data/IBOInstance.js';

export interface IDataContainer{
    id:number
    value: Ref<Array<IBOInstance>>;
    boType: BusinessObject;

    GetValueType(): string;
    AddValue(value: IBOInstance): void;
}