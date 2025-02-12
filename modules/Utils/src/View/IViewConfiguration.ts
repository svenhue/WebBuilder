import { IViewDataConfiguration } from "./ViewDataConfiguration.js";
//import { IParameterBinding } from "../InteractionFlows/IParameterBinding.js";
import { ViewRoles } from "./ViewRoles.js";
import { IBOInstance } from "../Data/IBOInstance.js";
import { IViewInteraction } from "./Interaction/IViewInteraction.js";
import { IRouteDefinition } from './Navigation/IRouteDefinition.js'
export interface IViewConfiguration extends IBOInstance {

    id: number;
    contextid: number;
    publicidentifier?: string;
    isRoutable?: boolean;
    route: IRouteDefinition,
    type: string
    appName?: string; // todo remove this
    template?: string;
    isRoot?: boolean;
    icon?: string;
    imagePath?: string;
    tag: string;
    content?: object;
    requiresAuth:{
        auth: boolean,
        redirect?: string
    }
    properties: {
        isActive: boolean // todo remove this
        imageSrc: string
        iconName: string
        showIf: string
    }
    isActive?: boolean;
    position?: number // position in the rendering process
    interaction?: IViewInteraction;
    htmlattributes?: object;
    class: Array<string>
    style?: object;
    role?: ViewRoles
    parentId?: number
    dataConfig?: IViewDataConfiguration  // todo remove this
    //parameterBindings?: Array<IParameterBinding>; // todo remove this
    children? : Array<IViewConfiguration>

    //remove this
    value: Array<IViewConfiguration>
    templateIdentifier?: string; // todo remove this

}