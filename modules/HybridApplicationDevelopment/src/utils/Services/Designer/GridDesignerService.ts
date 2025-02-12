//@ts-ignore
//@ts-nocheck
import { IViewConfiguration } from "alphautils";
import { injectable, inject } from "inversify";
import { ViewElementFactory } from "../../ViewElementFactory";



@injectable()
export class GridDesignerServive{

    private service: ViewElementFactory

    constructor(
        @inject("ViewElementFactory") service: ViewElementFactory
        ){
            this.service = service;
    }

    public CreateDefaultDevelopmentGridElements(parent: IViewConfiguration){
        const result = new Array<IViewConfiguration>();
        
        const values1 = {
            style:{
                'grid-row': '1',
                'grid-column': '1'
            }
        }
        result.push(this.service.Create('viewtemplate:RawHTML:GridElement', values1 , parent.id, false))
        
        const values2 = {
            style:{
                'grid-row': '1',
                'grid-column': '2'
            }
        }
        
        result.push(this.service.Create('viewtemplate:RawHTML:GridElement', values2 , parent.id, false))

        if(parent.style == undefined){
            parent.style = {}
        }
        const parentStyle = {
            'display': 'grid',
            'grid-columns': '50% 50%',
            'grid-rows': '100%',
            'width': '100%',
            'height': ' 100px'
        }
        Object.assign(parent.style, parentStyle)

        result.push(parent)
        return result;

    }

}