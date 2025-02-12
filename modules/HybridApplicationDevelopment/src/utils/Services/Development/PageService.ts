import { IPageConfiguration } from "alphautils";
import { ViewService } from "./ViewService";

export class PageService{

    public static CreatePageConfig(config?: IPageConfiguration){
        if(config == undefined){
            return PageService.CreateDefaultPage();
        }
    }

    public static CreateDefaultPage(){
        return {
            name: 'New Page',
            views:[ViewService.createDefaultRootView()]
        } as IPageConfiguration
    }
}