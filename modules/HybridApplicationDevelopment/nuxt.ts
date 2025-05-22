import { defineNuxtModule, createResolver, extendPages } from '@nuxt/kit'
import { resolve } from 'path'

export default defineNuxtModule({

  
  setup(options){
    const resolver = createResolver(import.meta.url)
    extendPages((pages => {
      const homePage = pages.find(page => page.path === '/home')
      if (homePage) {
        if (!homePage.children) {
          homePage.children = []
        }
        
        homePage.children.push({
          name: 'Creations',
          path: 'Creations', // relative path (no slash!)
          file: resolver.resolve('src/pages/Creations.vue')
        })
      } else {
        console.warn('Parent /Home route not found')
      }
      pages.push({
          name: 'aihelper',
          path: '/newwebsite',
          file: resolver.resolve('src/Agentic/AgenticWebsiteCreationChatComponent.vue')
      })
     
    }))
  }
})