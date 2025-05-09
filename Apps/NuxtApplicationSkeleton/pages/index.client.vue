
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
          const pageconfig = {"id":1,"clientOnly":true,"name":"index","route":{"path":"/","name":"index"},"requiresAuth":{"auth":true},"tag":"component:RootLayout","isRoot":true,"children":[{"id":24,"tag":"component:Login","isRoutable":true,"route":{"path":"/login","name":"login","parentName":"index"}},{"name":"WebCreator","id":22,"clientOnly":true,"tag":"component:WebCreator","isRoutable":true,"route":{"path":"/webcreator","name":"webcreator","parentName":"index"}},{"name":"marketplace","id":7,"tag":"component:MarketplaceOverviewComponent","isRoutable":true,"route":{"path":"/marketplace","name":"marketplace","parentName":"index"}},{"id":10,"name":"TestChat","tag":"component:ChatComponent","isRouteable":true,"route":{"path":"/chat","name":"chat","parentName":"index"}},{"id":2,"clientOnly":true,"name":"appdevelopment","tag":"component:MainDevelopmentLayout","isRoutable":true,"route":{"path":"/appdevelopment","name":"appdevelopment","parentName":"index"},"children":[{"clientOnly":true,"name":"development","id":4,"tag":"component:DevelopmentComponent","isRoutable":true,"route":{"path":":appName","name":"development","parentName":"appdevelopment"}}]},{"id":3,"clientOnly":true,"tag":"component:CreateNewApplicationSolution","isRoutable":true,"requiresAuth":{"auth":true,"redirect":"/auth/login"},"route":{"path":"/createApp","name":"createApp","parentName":"index"}}]} as IPageConfiguration
  
          const resolver = new ComponentResolver()
          const page = new Page(
              pageconfig, 
              templateRef
              
              ,useRouter(),resolver
              )
  
          </script>
      