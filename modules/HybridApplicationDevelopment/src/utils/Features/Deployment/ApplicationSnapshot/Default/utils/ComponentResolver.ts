import { type IComponentResolver, BaseComponentResolver } from 'alphaviewlibrary'
import { type IViewConfiguration } from 'alphautils'
import { defineAsyncComponent } from 'vue';

export class ComponentResolver extends BaseComponentResolver implements IComponentResolver{

    constructor(){
        super()
    }

    public override resolveComponent(node: IViewConfiguration) {
        

        const componentName = this.GetComponentName(node.tag);
        //const importPath = 'hybridappdev'
        if(node.tag?.startsWith('component:')){
            let component = undefined //defineAsyncComponent(() =>  import(/* @vite-ignore */  'alphaviewlibrary').catch(e => console.log(e)).then(m => m[componentName]))
            if(component == undefined){
                
                component = defineAsyncComponent(() =>  import('hybridappdev')
                    .catch(e => console.log("Import Error", e))
                    .then(m =>  m[componentName]))
                    const t = import('hybridappdev')
            }
            return component;
        }

    }
}