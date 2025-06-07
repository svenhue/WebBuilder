import { ref, Ref } from 'vue';
import { BusinessObject } from '../Data/BusinessObject.js';
import { IBOInstance } from '../Data/IBOInstance.js';

import { IDataContainer } from './IDataContainer.js';

export class BODataContainer implements IDataContainer{
    public id: number;
    public value: Ref<Array<IBOInstance>>
    public boType: BusinessObject
    


    constructor(boType?: BusinessObject, value?: Array<IBOInstance> ){
        this.value = ref([]);
        if(value != undefined){
            this.value.value.push(...value);
        }
        this.boType = boType;
    }

    public GetValueType(): string{
        return typeof this.value;
    }

    public AddValue(value: IBOInstance){
        //@ts-expect-error
        this.value.push(value);
    }

    public ReplaceValueBo(value: IBOInstance){
        //@ts-expect-error
        const index = this.value.findIndex(x => x.id == value.id);
        if(index > -1){
            this.value[index] = value;
        }else{
            throw new Error("Value not found");
        }
    }
    public HasBoWithId(bo: IBOInstance){
        // @ts-expect-error
        return this.value.findIndex(x => x.id == bo.id) > -1;
    }

}