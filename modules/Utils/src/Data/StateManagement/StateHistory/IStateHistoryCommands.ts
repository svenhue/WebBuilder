import { SimpleNameValueCollection } from "src/Data/SimpleNameValueCollection";
import { IBOInstance } from "../../IBOInstance";
import { IStateCommand } from "./IStateCommand";

export interface IStateHistoryCommands{
    boName?: string;
    contextid?: number;
    create: IStateCommand;
    update: (value: IBOInstance | SimpleNameValueCollection , oldValue: IBOInstance | SimpleNameValueCollection, commit?:  boolean) => void;
    delete: (value: IBOInstance | SimpleNameValueCollection, commit?:  boolean) => void;
    updatePartial: (id: number, value: IBOInstance| SimpleNameValueCollection, oldValue: IBOInstance| SimpleNameValueCollection, commit?:  boolean) => void;
}