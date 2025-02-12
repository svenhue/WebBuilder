import { IPageConfiguration } from "alphautils";

export class PageConfigurationHelper{

    public static validatePage(page: IPageConfiguration, correctWithoutMessage: boolean = true){

        if(page.name == undefined){
            throw new Error("Page name must be defined")
        }

        // is the route.name set? This is required for the generation of the page files
        // the default value is the page.name
        if(page.route == undefined || typeof page.route != 'object'){
            page.route = {
                
            }
        }

        if(page.route.name == undefined){

            
            page.route.name == page.name
        }

    }
}