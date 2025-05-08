import { createResolver, defineNuxtModule,addPlugin  } from 'nuxt/kit'


export default defineNuxtModule({
  meta: {
    name: 'hello'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('plugins/AlphaUIAppExtension.ts'))
    addPlugin(resolve('plugins/NonPojoPayloadPlugin.ts'))


  }
})