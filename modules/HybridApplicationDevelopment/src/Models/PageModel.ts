import { IPageConfiguration, IViewConfiguration, ViewRoles } from "alphautils";
import { IRouteDefinition , IPageMeta, IPageHeader} from "alphautils";

export class PageModel implements IPageConfiguration{
    
    public url: string;
    public views: IViewConfiguration[]; // we dont use this because they are nested
    public flatterndViews: IViewConfiguration[] = new Array<IViewConfiguration> // instead we use this 
    public publicidentifier?: string;
    public requiresAuth: { auth: boolean; redirect?: string; };
    public name: string;
    public role?: ViewRoles;
    public style?: object;
    public meta: IPageMeta;
    public id: number;
    public parentId?: number;
    public route: IRouteDefinition;
    public tag: string;
    public head: IPageHeader;
    public htmlattributes?: object;

    constructor(
        config: IPageConfiguration
    ){
        Object.assign(this, config)
    }
}