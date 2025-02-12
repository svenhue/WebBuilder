import { IPageConfiguration, IViewConfiguration, searchObjectInNestedArray } from "alphautils";
import { PageModel } from "../../../../Models/PageModel";

export class PageService{


    private static unflattern(views: Array<IViewConfiguration>): Array<IViewConfiguration>{
        
        for(const view of views){
            if(view.parentId != undefined){
                const parent = searchObjectInNestedArray(views, 'children', 'id', view.parentId)
                if(parent ==undefined){
                    throw new Error('Parent not found')
                }
                if(parent.children == undefined){
                    parent.children = new Array<IViewConfiguration>()
                }
                parent.children.push(view)
            }
        }
        return views
    }

    public static flattern(page: IPageConfiguration): PageModel{
        
        const views = [];
        
        function flat(view: IViewConfiguration): Array<IViewConfiguration>{
            views.push(view)
            if(view.children != undefined){
                for(const child of view.children){
                    flat(child)
                }
            }
            return views
        }
    
    }

}