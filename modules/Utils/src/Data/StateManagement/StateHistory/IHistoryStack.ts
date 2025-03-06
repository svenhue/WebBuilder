import { IBOInstance } from "src/Data/IBOInstance";
import { StateChangeTypes } from "src/Data/Repositorys/StateChangeTypes";


interface IHistoryEntry{
    id?: number;
    value: IBOInstance;
    oldValue?: IBOInstance;
    timestamp?: number;
    commandName?: string
    stateChangeType: StateChangeTypes
}

interface IHistoryEntrys{
    entrys: Array<IHistoryEntry>;
    timestamp?: number;
    isCommited?: boolean;
    guid?: string;
    reverseGuid?: string;
}

interface IHistoryStack{
    values: Array<IHistoryEntrys>
}

export { type IHistoryStack, type IHistoryEntry, type IHistoryEntrys}