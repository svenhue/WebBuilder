<template>
    <div>
        
        <div id="vueMarkdownRenderer" v-html="renderedMarkdown">

        </div>
    </div>
</template>
  
<script setup lang="ts">
//import AcceptSuggestedActionComponent from '../Chat/ChatComponents/AcceptSuggestedActionComponent.vue';
import MarkdownIt from 'markdown-it';
import { Quasar } from 'quasar'
import { h, createApp, defineComponent, ref, watch, onMounted } from 'vue';
import { waitForElm } from 'alphautils';
import type Token from 'markdown-it/lib/token.mjs';

    const props = defineProps({
        markdown:{
            type: String,
            required: true
        }
    })

    const renderedMarkdown = ref('');
    const md = new MarkdownIt({html: true});
    const apps = []
   let id = "X"
    onMounted(() => {
        render(props.markdown)
    })

    watch(() => props.markdown, (newVal) => {
        
        render(newVal)
    })
    
  
      
    function render(markdown: string){

        for(const app of apps){
            app.app.unmount()
        }

        const parsedMarkdown = md.parse(markdown, {});
        traverse(parsedMarkdown);
  
  
      
        renderedMarkdown.value = md.renderer.render(parsedMarkdown, {});
     
        for(const app of apps){
            waitForElm(`#${app.target}`).then((el) => {
                app.app.mount('#' + app.target)
                
            })
        }
    }
        
    const vueComponentIdents = [
        {
            ident: "mindcode:command:start",
            //component: AcceptSuggestedActionComponent
        }
    ]
    
    
     // add the vue app instances
     // extentable
      const traverse = (tokens) => {
        
        const regex = /mindcode:command:start.*?mindcode:command:end/;
        for (let i = 0; i < tokens.length; i++) {
            const myId = id
          const token = tokens[i];

          const compIdent = vueComponentIdents.find(e => regex.test(token.content))
          
          if (compIdent != undefined && token.block == false) {
            const componentName = token.info.trim();

            const contentProp = token.content.replace(compIdent.ident, "").replace(compIdent.ident.substring(0, compIdent.ident.lastIndexOf("start")) + "end", "")
            
            function replaceMarkdownProduced(content){
                return content.replace("\n", "")
            }

            const app = createApp({
                components: {
                    AcceptSuggestedActionComponent
                },
              render: () => h(compIdent.component, {content: replaceMarkdownProduced(contentProp)}),
            });
            app.use(Quasar);
            
            token.content = `<div id="${myId}"></div>`
            token.type = 'html_inline'
            token.tag = ""

            id = id +  "X"

            apps.push({
                target: myId,
                app: app
            })

          }
          
          if (token.children) {
            traverse(token.children);
          }
        }
      };
      

      
  </script>