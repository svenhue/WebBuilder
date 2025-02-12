import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { resolve } from 'path'

export default defineNuxtModule({
  hooks: {
    'components:dirs': (dirs) => {
      const { resolve } = createResolver(import.meta.url)
      // Add ./components dir to the list
      dirs.push({
        path: resolve('./src')
      })
    },
    'components:extend': (components) => {
      // Add a new component
      components.push({kebabName: 'RootLayout', pascalName: 'RootLayout', path:resolve('./src/VueComponents/RootLayout.vue')})
    }
  }
})