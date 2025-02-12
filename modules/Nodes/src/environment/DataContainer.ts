import { IDataContainer } from "./IDataContainer";

export class DataContainer implements IDataContainer{

    constructor(initialData: IDataContainer){
        Object.assign(this, initialData);
    }
}