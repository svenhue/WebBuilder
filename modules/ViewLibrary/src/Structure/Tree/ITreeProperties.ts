import { TreeTickStrategys } from "./TreeTickStrategys.js";

interface ITreeSlotConfiguration{

}


export interface ITreeProperties{
    tickStrategy: TreeTickStrategys;
    noSelectionUnset: boolean;
    defaultExpandAll: boolean;
    accordion: boolean;
    noTransition: boolean;
    nodeKey: string;
    labelKey: string;
    childrenKey: string;
    icon: string;
    filter: string;
    slotConfiguration: ITreeSlotConfiguration;

}