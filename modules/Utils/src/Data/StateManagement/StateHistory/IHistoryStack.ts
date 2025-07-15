import { IBOInstance } from "../../IBOInstance.js";
import { StateChangeTypes } from "../..//Repositorys/StateChangeTypes.js";
import { SimpleNameValueCollection } from "../../SimpleNameValueCollection.js";


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
    isSavedPermanently?: boolean;
    guid?: string;
    reverseGuid?: string;
}

interface IHistoryStack{
    values: Array<IHistoryEntrys>
}

export { type IHistoryStack, type IHistoryEntry, type IHistoryEntrys}