import { VueApplication,AuthenticationMiddleware } from "alphautils";
import {WebBuilderApplicationConfiguration} from "../../../AppConfigs/AppConfig.js"
import { config } from "../../../AppConfigs/pages.js"

export default defineNuxtPlugin({
    order: 10,
    dependsOn: ['nuxt:revive-payload:client', 'nuxt:revive-payload:server', 'nuxt:chunk-reload'], // required to access pinia on client and server side
    name: 'appextension',
    enforce: 'pre', // or 'post'
    async setup (nuxtApp) {
        
      //app instance
        const alphaApp = new VueApplication(
          new WebBuilderApplicationConfiguration(), 
          undefined, 
          nuxtApp.vueApp,
          undefined,
          undefined, 
          nuxtApp.$pinia, 
          new ComponentResolver())
        .setup()
        .build()
        .mount();
      
      
      

      
      for(const page of config.pages){
        
        if(page.requiresAuth?.auth == true){
          //todo auth
          addRouteMiddleware('auth',  AuthenticationMiddleware)

        }
      }

    
        
    },
    
    env: {
      // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
      islands: true
    }
  })