import { IPageConfiguration } from 'alphautils';
import { IViewConfiguration } from 'alphautils';
import { inject,  Teleport, Ref, h } from 'vue';
import { IComponentResolver } from './IComponentResolver.js';
import { getCurrentInstance } from 'vue';
import { ValueResolver, IExecutionContextProvider } from 'alphautils';

export function BaseVueRenderer(defaulttag: string, contextid: number, node: IViewConfiguration | IPageConfiguration, resolver: IComponentResolver, 
    contextProvider: IExecutionContextProvider
){
    const getter = inject('viewGetter_' + contextid) as (viewid: number) => { view: Ref<IViewConfiguration>, children: Ref<IViewConfiguration[]> } | undefined;
        
        function HTMLorProps(node: IViewConfiguration){
            if(node.tag?.startsWith('tag')){
                return  {... node.htmlattributes, style: node.style}
            }
            else if(node.tag?.startsWith('component')){
                if(node.key == undefined){
                    return {viewId: node.id, contextid: contextid};
                }else{
                    //ability to force remount of component by changing the key
                    //todo:
                    return {viewId: node.id, contextid: contextid, key: node.key};
                }
            }

        }
        function resolveComponent(node: IViewConfiguration){
            if(node.tag == 'component:Teleport'){
                return Teleport;
            }            
            return resolver.resolveComponent(node)
        }
        function setTag(node: IViewConfiguration){
            if(node.tag == undefined){
                return defaulttag.replace('tag:', '');
            }
            else if(node.tag?.startsWith('tag:')){
                const pos = node.tag?.lastIndexOf(':') 
                const index = node.tag?.indexOf(':', pos) +1
                return node.tag.slice(index)
            }else if(node.tag?.startsWith('component:')){
   
                return resolveComponent(node)
            }
        }
        function getChildren(node: IViewConfiguration, allowOnlyRawHTMLChildren = false){
            if(allowOnlyRawHTMLChildren == true){
                return getter(node.id).children.value.filter(c => c.tag?.startsWith('tag'))
            }
            return getter(node.id).children.value
        }
        function render(node: IViewConfiguration){
            if(node?.properties?.showIf != undefined && node.properties.showIf != ''){
                if(ValueResolver(contextProvider, contextid, node.properties.showIf, node) == false){
                    return;
                }
            }
            if(node == undefined){
                return  h(defaulttag.replace('tag:', ''))
            }
            if(node.meta != undefined){
                return node.views.filter(n => n.parentId == undefined).map((view) => {
                    return render(view)
                })
            }
                if(node.tag?.startsWith('component')){
                    return  h(setTag(node), HTMLorProps(node),() =>  getChildren(node)?.map((child) => {
                            return render(child);
                        })
                    );
                }
                else if(node.tag?.startsWith('tag')){
                    return h(setTag(node), HTMLorProps(node), getChildren(node, false)?.map((child) => {
                        return render(child);
                    }),
                );
                }
            
        }
        return () => render(node);
}