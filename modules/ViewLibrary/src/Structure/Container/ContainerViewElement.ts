import { IApplicationConfiguration } from 'alphautils';
import { IViewElement } from 'alphautils';
import { ViewElement } from 'alphautils';

export class ContainerViewElement extends ViewElement{


    constructor(view: IViewElement, config: IApplicationConfiguration){
        super(view);
        console.log(config)
        this.setStyles(config);
    }
    setStyles(config: IApplicationConfiguration){
        //todo use dataadapter
/*         if(parseInt(config.applicationScreen.width.replace('px', '')) > 1200){
            if(this.htmlattributes.style == undefined){
                this.htmlattributes.style = {};
            }
            if(this.htmlattributes?.style.width == undefined){
                this.htmlattributes.style.width = '920px';
            }
            
            if(this.htmlattributes?.style.margin == undefined){
                this.htmlattributes.style.margin = '0 auto';
            }
        }else {
            if(this.htmlattributes.style == undefined){
                this.htmlattributes.style = {};
            }
            this.htmlattributes.style.width = '100%';
        } */
    }
}