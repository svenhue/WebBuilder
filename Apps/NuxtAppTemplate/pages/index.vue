
          <template>
              <div ref="templateRef">
                
                  <ComponentTreeBase :view="page.config.value" :isPage="true" :contextid="page.config.value.contextid" :resolver="resolver" />
                  <NuxtPage :contextid="page.config.value.contextid"></NuxtPage>
              </div>
          </template>
  
  
          <script setup lang="ts">
         
          //import { useHead } from 'unhead'
          import { ref } from 'vue'
          import { Page,IPageConfiguration } from 'alphautils'
          import   {ComponentTreeBase}   from 'alphaviewlibrary'
          import { ComponentResolver } from '@src/utils/ComponentResolver'
          import { useRouter } from 'vue-router'
  
  
          definePageMeta({
            middleware:[
              
            ],
            auth: { requiresAuth: undefined, redirect:"/login"}
          })
  
          const templateRef = ref<HTMLElement>(null)
          const pageconfig = {"name":"Your Page","meta":{"title":"Your Page"},"role":"Landingpage","route":{"path":"/"},"views":[{"type":"viewdefinition:Application:DefaultRootComponent","tag":"component:DefaultRootComponent","name":"Default Root Component_4","htmlattributes":{"data-element":"element_4"},"style":{"position":"relative","height":"100%","width":"100%"},"dataConfig":{},"properties":{"isactive":true},"isRoot":true,"id":4,"publicidentifier":"element_4","contextid":4,"boName":"ViewConfiguration"}],"id":3,"contextid":4,"boName":"Page"} as IPageConfiguration
  
          const resolver = new ComponentResolver()
          const page = new Page(
              pageconfig, 
              templateRef
              
              ,useRouter(),resolver
              )
  
          </script>
      