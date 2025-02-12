import { createResolver, defineNuxtModule,addPlugin  } from 'nuxt/kit'


export default defineNuxtModule({
  meta: {
    name: 'hello'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    
    
    // adding file based routes
    
    //todo: add plugins
    addPlugin(resolve('plugins/AlphaUIAppExtension.ts'))
    addPlugin(resolve('plugins/NonPojoPayloadPlugin.ts'))


    //todo: handle pages and vue router routing
    
    //todo feature: hybrid rendering for pages
    //router options

  }
})