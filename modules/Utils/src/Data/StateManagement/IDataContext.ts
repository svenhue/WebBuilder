import { ITreeNode } from "../Structures/Tree/ITreeNode.js";
import { ContextLevel } from "./ContextLevel.js";

export interface IDataContext extends ITreeNode{
    contextid: number;
    contextLevel: ContextLevel
    parentId: number;
    children: Array<IDataContext>;
}