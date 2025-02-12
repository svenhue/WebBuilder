// https://nuxt.com/docs/api/configuration/nuxt-config
import { Nitro } from 'nitropack'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:true,
  nitro: {
   
    prerender: {
      failOnError: false
    },
  },
  hooks:{
    'nitro:build:before':(nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata')
    }
  },
  vite:{
    esbuild: {

      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    },
    optimizeDeps:{
        
      exclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary', 'file-saver', 'jszip', '@webcontainer'],
      esbuildOptions: {
      
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
            
          }
        }
      }
    },
  }
})
