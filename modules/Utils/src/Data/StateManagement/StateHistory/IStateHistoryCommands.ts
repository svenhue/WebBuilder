import { IBOInstance } from "./IBOInstance";
import { IStateCommand } from "./IStateCommand";

export interface IStateHistoryCommands{
    boName?: string;
    contextid?: number;
    create: IStateCommand;
    update: (value: IBOInstance) => void;
    delete: (value: IBOInstance) => void;
    updatePartial: (value: IBOInstance) => void;
}