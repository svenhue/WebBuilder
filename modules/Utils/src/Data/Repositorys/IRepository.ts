import { useDataStore } from "../../stores/useDataStore.js"
import { IDataAdapter } from "../DataAdapters/IDataAdapter.js"
import { IBOInstance } from "../IBOInstance.js"
import { StateChangeTypes } from "./StateChangeTypes.js"

export interface IRepository{
        store: ReturnType<typeof useDataStore>
        subscribers: Array<IDataAdapter> 

        Create(value: IBOInstance, persistslocalStore:boolean) : IBOInstance
        CreateContainer(value: IBOInstance) : number
        Get() : Array<IBOInstance> | IBOInstance
        Update(id: number, newValue: IBOInstance , persistslocalStore:boolean) : IBOInstance
        Delete(value: IBOInstance , persistslocalStore:boolean) : void
        Publish(value: IBOInstance, changeType: StateChangeTypes)
        IsPublisher(subscriber: IDataAdapter, value: IBOInstance): boolean
        Subscribe(subscriber: IDataAdapter)

        CommitHistory(contextid?: number)
        CreateHistory(contextid: number)

}