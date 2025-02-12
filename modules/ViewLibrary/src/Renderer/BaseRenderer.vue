<template>
    <div>
       
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { defineAsyncComponent } from 'vue';
import { Teleport } from 'vue'
import {  useWebNodeStore } from 'alphautils'
import { IViewConfiguration } from 'alphautils';

  const props = defineProps( {
    defaulttag: {
      type: String,
      required: false,
      default: 'tag:div'
    },
    contextid: {
        type: Number,
        required: false
    },
    webnode:{
        type: Object,
        reuqired: false
    },
    webnodes:{
        type: Array,
        required: false
    },
    rootprops:{
        type: Object,
        required: false
    },
    parentid:{
        type: Number,
        required: false
    }
    })
        const store = useWebNodeStore()
        function HTMLorProps(node: IViewConfiguration){
            if(node.tag?.startsWith('tag')){
                return  node.htmlattributes
            }
            else if(node.tag?.startsWith('component')){
                return {element: node, contextid: props?.contextid};
            }
        }
        function resolveComponent(node: IViewConfiguration){
            if(node.tag == 'component:Teleport'){
                return Teleport;
            }
            if(node.tag?.startsWith('component:')){
                const component =  defineAsyncComponent(() => import('./src/components/' + node.tag.replace('component:', '') + '.vue'))
                return component;
            }
        }
        function setTag(node: IViewConfiguration){
            if(node.tag == undefined){
                return props.defaulttag.replace('tag:', '');
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
            return node.children;
        }
        function render(node: IViewConfiguration){
            if(node.properties?.isactive != false){
                if(node.tag?.startsWith('component')){
                return h(setTag(node), HTMLorProps(node), {default: () => getChildren(node)?.map((child) => {
                    return render(child);
                    }), 
                });
                }else if(node.tag?.startsWith('tag')){
                    return h(setTag(node), HTMLorProps(node), getChildren(node)?.map((child) => {
                        return render(child);
                    }),
                );
                }
            }
        }
        function renderContextRoot(){
            const contextrootelement = store.byKey(props.contextid, 'type', 'environment')
            if(contextrootelement != undefined){
                return render(contextrootelement)
            }
        }
   
        function renderRoot(){ 
            if(props.webnode){
                return render(props.webnode as IViewConfiguration)
            }else if(props.webnodes){
                return h(props.defaulttag.replace('tag:', ''), props.rootprops, {default: () =>  props.webnodes?.map((node) => {
                    return render(node as IViewConfiguration);
                })
            })
            }else if(props.parentid){
                const parent = store.byKey(props.contextid, 'id', props.parentid)
                return getChildren(parent)?.map((node) => {
                    return render(node);
                })
            }
            else{
                return renderContextRoot();
            }
        }
         renderRoot();


</script>