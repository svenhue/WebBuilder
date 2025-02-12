import { Component, defineAsyncComponent } from "vue";
import { IComponentResolver } from "./IComponentResolver.js";
import { IViewConfiguration } from "alphautils";

export class BaseComponentResolver implements IComponentResolver{


    private _path: string;

    constructor(path?: string){
        if(path != undefined){
            this._path = path;
        }
    }

    public resolveComponent(node: IViewConfiguration): Component {
        

        const componentName = this.GetComponentName(node.tag);
        const importPath = '../../index.ts' //'alphaviewlibrary'
        if(node.tag?.startsWith('component:')){
            let component = undefined //defineAsyncComponent(() =>  import(/* @vite-ignore */  'alphaviewlibrary').catch(e => console.log(e)).then(m => m[componentName]))
           
            if(component == undefined){
                component = defineAsyncComponent(() =>  import(/* @vite-ignore */  '../../index.ts').catch(e => console.log("Import Error", node.tag)).then(m => m[componentName]))
            }
    
            return component;
        }

    }

    private GetDevelopmentPath(){
        const path = 'http://localhost:9000/@fs/C:/Projects/Shared/Alpha/WebBuilder/modules/ViewLibrary/index.ts'
        return path;
    }
    private GetProductionPath(){
        return 'virtual:alphaviewlibrary'
    }

    private GetPath(){
        
        if(this._path == undefined){
           return this.GetDevelopmentPath();
        }
        return this._path;
    }

    public GetComponentName(tag: string){
        return tag.replace('component:', '')
    }
}