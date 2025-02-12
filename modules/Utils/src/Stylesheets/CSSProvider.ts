//@ts-nocheck

import { injectable } from "inversify";
import { IApplicationStyleSheets } from "../Application/Stylesheets/IApplicationStyleSheets.js";

@injectable()
export class CSSProvider{

    public ProvideThemeAsCSSElement(stylesheets: IApplicationStyleSheets, target?: HTMLElement){
        let text = '';
        
        for(const color of stylesheets?.colors){
            text += `.text-${color.key} { color: ${color.value}; }`
            text += `.bg-${color.key} { background: ${color.value}; }`
        }   

        const oldtheme = document.getElementById('alpha-theme');
        if(oldtheme != undefined){
            oldtheme.remove();
        }   
        const el = this.CreateCSSElement(text);
        if(target != undefined){
            target.appendChild(el);
        }else{
            document.body.appendChild(el);
        }
    }

    private CreateCSSElement(style: string){
        const styleElement = document.createElement('style');
        styleElement.id = 'alpha-theme';
        styleElement.innerHTML = style;
        return styleElement;
    }
}