import { type IComponentResolver, BaseComponentResolver } from 'alphaviewlibrary'
import { type IViewConfiguration } from 'alphautils'
import { defineAsyncComponent } from 'vue';
import * as hybrid from 'hybridappdev'
import * as alpha from 'alphaviewlibrary'
export class ComponentResolver extends BaseComponentResolver implements IComponentResolver{

    constructor(){
        super()
    }

    public override  resolveComponent(node: IViewConfiguration) {
        

        const componentName = this.GetComponentName(node.tag);
        //const importPath = 'hybridappdev'

        if(node.tag?.startsWith('component:')){
            let component = undefined //defineAsyncComponent(() =>  import(/* @vite-ignore */  'alphaviewlibrary').catch(e => console.log(e)).then(m => m[componentName]))
            
          
            if(component == undefined){
                
                //todo really bad practice
                //refactor with nuxt virtual files or layers
                    if(hybrid[componentName] == undefined){
                        component = defineAsyncComponent(() =>  import('alphaviewlibrary')
                        .then(m =>  m[componentName]))
                       
                    }else{
                        component = defineAsyncComponent(() =>  import('hybridappdev')
                        .then(m =>  m[componentName]))
                    }
            }
            return component
        }

    }
}