//@ts-nocheck
import { UIAction } from "src/ClientActions/UIAction.js";
import { IViewConfiguration } from "./IViewConfiguration.js";
import { IViewDataConfiguration } from "./ViewDataConfiguration.js";
import { IParameterBinding } from "../InteractionFlows/IParameterBinding.js";
import { IBOInstance } from "src/Data/IBOInstance.js";

export class ViewConfiguration implements IViewConfiguration, IBOInstance{
    id: number;
    contextid: number;
    parentId?: number; 
    appName?: string;
    isRoot?: boolean;    
    properties: {
        isactive: boolean
    }

    boName: 'ViewConfiguration'
    stateChangePublisherId: number;
    publicidentifier?: string;
    template: string;
    tag: string;
    role:string
    content: object;
    appereance: object;
    dataConfig: IViewDataConfiguration
    interaction: {
        actions: Array<UIAction>
    };
    parameterBindings?: Array<IParameterBinding>;
}