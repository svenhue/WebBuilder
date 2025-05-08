import { defineNuxtModule, createResolver, extendPages, addPlugin, addRouteMiddleware , AddRouteMiddlewareOptions} from '@nuxt/kit'
import { type ModuleOptions } from './runtime/types'


export default defineNuxtModule<ModuleOptions>({

  meta: {
    name: 'alphaauthmodule',
    configKey: 'alphaauthmodule'
  },
  
  setup(options, nuxt){
    const { resolve } = createResolver(import.meta.url)


   
    addRouteMiddleware({
      name: 'global-auth',
      global: true,
      path: resolve('./runtime/middleware/auth.ts')
    })
  }
})