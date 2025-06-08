import { Ref } from "vue";
import { IHistoryStack } from "./IHistoryStack.js";

export interface IStateHistory{
    history: Ref<IHistoryStack>;
    redoStack: Ref<IHistoryStack>;
    undoStack: Ref<IHistoryStack>;
    contextid: number;
}