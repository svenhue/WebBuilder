
<script lang='ts'>
import {  h, inject, Ref } from 'vue';
import { Teleport, defineAsyncComponent } from 'vue'
import { IPageConfiguration } from 'alphautils/view/IPageConfiguration.ts';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';

export default {
    props: {
        defaulttag: {
            type: String,
            required: false,
            default: 'tag:div'
        },
        contextid: {
            type: Number,
            required: false
        },
        page:{
            type: Object as () => IPageConfiguration,
            reuqired: false
        }
    },
    setup({page, contextid, defaulttag}){
                
        const getter = inject('viewGetter_' + contextid) as (viewid: number) => { view: Ref<IViewConfiguration>, children: Ref<IViewConfiguration[]> } | undefined;

        function HTMLorProps(node: IViewConfiguration){
            console.log(5555, node)
            if(node.tag?.startsWith('tag')){
                return  {... node.htmlattributes, style: node.style}
            }
            else if(node.tag?.startsWith('component')){
                return {viewId: node.id, contextid: contextid};
            }
        }
        /* eslint-disable */
        function resolveComponent(node: IViewConfiguration){
            if(node.tag == 'component:Teleport'){
                return Teleport;
            }            
            const componentName = node.tag.replace('component:', '');
            const path = 'virtual:alphaviewlibrary'
            if(node.tag?.startsWith('component:')){
                const component = defineAsyncComponent(() =>  import(/* @vite-ignore */path ).then(m => m[componentName]))  // eslint-disable-line
                return component;
            }
        }
        /* eslint-enable */
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
        function getChildren(node: IViewConfiguration){   
            return getter(node.id)?.children.value
        }

        function render(node: IPageConfiguration){
            if(node.meta != undefined){
                return node.views.filter(n => n.parentid == undefined).map((view) => {
                    return render(view)
                })
            }
            if(node.tag?.startsWith('component')){
                    return h(setTag(node), HTMLorProps(node));
                }
            else if(node.tag?.startsWith('tag')){
                return  h(setTag(node), HTMLorProps(node), getChildren(node)?.map((child) => {
                    return render(child);
                }),
                );
            }
        }
        return () => render(page)
    }
}

        
        
</script>