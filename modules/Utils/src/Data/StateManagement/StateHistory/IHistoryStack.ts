import { IBOInstance } from "src/Data/IBOInstance";
import { StateChangeTypes } from "src/Data/Repositorys/StateChangeTypes";


interface IHistoryEntry{
    id?: number;
    value: IBOInstance;
    oldValue?: IBOInstance;
    timestamp?: number;
    stateChangeType: StateChangeTypes
}

interface IHistoryEntrys{
    entrys: Array<IHistoryEntry>;
    timestamp?: number;
}

interface IHistoryStack{
    values: Array<IHistoryEntrys>
}

export { type IHistoryStack, type IHistoryEntry, type IHistoryEntrys}