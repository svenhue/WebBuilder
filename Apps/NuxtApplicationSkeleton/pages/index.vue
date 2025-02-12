
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
              "auth"
            ],
            auth: { requiresAuth: true, redirect:"/login"}
          })
  
          const templateRef = ref<HTMLElement>(null)
          const pageconfig = {"id":1,"name":"index","route":{"path":"/","name":"index"},"requiresAuth":{"auth":true},"tag":"component:RootLayout","isRoot":true,"children":[{"name":"marketplace","id":7,"tag":"component:MarketplaceOverviewComponent","isRoutable":true,"route":{"path":"/marketplace","name":"marketplace","parentName":"index"}},{"id":10,"name":"TestChat","tag":"component:ChatComponent","isRouteable":true,"route":{"path":"/chat","name":"chat","parentName":"index"}},{"id":2,"name":"appdevelopment","tag":"component:MainDevelopmentLayout","isRoutable":true,"route":{"path":"/appdevelopment","name":"appdevelopment","parentName":"index"},"children":[{"name":"development","id":4,"tag":"component:DevelopmentComponent","isRoutable":true,"route":{"path":":appName","name":"development","parentName":"appdevelopment"}}]},{"id":3,"tag":"component:CreateNewApplicationSolution","isRoutable":true,"route":{"path":"/createApp","name":"createApp","parentName":"index"}}]} as IPageConfiguration
  
          const resolver = new ComponentResolver()
          const page = new Page(
              pageconfig, 
              templateRef
              
              ,useRouter(),resolver
              )
  
          </script>
      