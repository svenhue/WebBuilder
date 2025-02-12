import { Ref } from "vue";
import { IHistoryStack } from "./IHistoryStack";

export interface IStateHistory{
    redoStack: Ref<IHistoryStack>;
    undoStack: Ref<IHistoryStack>;
    contextid: number;
}