import { IBOInstance } from "../../IBOInstance";
import { StateChangeTypes } from "../..//Repositorys/StateChangeTypes";
import { SimpleNameValueCollection } from "../../SimpleNameValueCollection";


interface IHistoryEntry{
    id?: number;
    value: IBOInstance | SimpleNameValueCollection;
    oldValue?: IBOInstance | SimpleNameValueCollection;
    timestamp?: number;
    commandName?: string
    boName?: string;
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