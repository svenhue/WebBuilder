import { SimpleNameValueCollection } from "../../SimpleNameValueCollection.js";
import { IBOInstance } from "../../IBOInstance.js";
import { IStateCommand } from "./IStateCommand.js";

export interface IStateHistoryCommands{
    boName?: string;
    contextid?: number;
    create: IStateCommand;
    update: (id: number, value: IBOInstance, oldValue: IBOInstance | SimpleNameValueCollection, commit?:  boolean) => void;
    delete: (id: number, commit?:  boolean) => void;
    updatePartial: (id: number, value: IBOInstance| SimpleNameValueCollection, oldValue: IBOInstance| SimpleNameValueCollection, commit?:  boolean) => void;
}