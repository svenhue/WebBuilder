// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path'
import { config } from './AppConfigs/pages'
const prefix = `monaco-editor/esm/vs`;

export default defineNuxtConfig({

  ssr: false, // Enable server-side rendering
  devtools: { enabled: true },
  modules:[
    /*'nuxt-electron',*/ 'alphaauthmodule',
    '@nuxt/ui-pro',
    'nuxt-monaco-editor',
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "alphaviewlibrary/nuxt",
    "hybridappdev/nuxt",
    '@nuxt/image',
    '@nuxt/icon'
  ],

  css: ['~/assets/css/tailwind.css'],

  i18n:{
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    },
    locales: [
      { code: 'en', name: 'English', file: 'en-US.json' },
    ]
  },

  nitro:{
    rollupConfig:{
      external: ['monaco-editor']
    },
    routeRules:{
      '**':{
       
      }
    }
  },

  vite: {
    //plugins: [nodePolyfills()],

    resolve: {
      alias:{
        "alphautils": "webbuilderalphautils"
      }
    },
    server:{
      fs:{
        allow:[
          'C:/Projects/WEBUI/WebUI/WebBuilder/modules/HybridApplicationDevelopment/assets/icons/'
        ]
      }
    },
    optimizeDeps:{

      exclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary',  '@webcontainer', "vue-i18n",'@webcontainer', 'monaco-editor' ],

      //only requiredexclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary', 'file-saver', 'jszip', '@webcontainer'],
      esbuildOptions: {
      
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    },
    
  },

  alias:{
    'appConfig': resolve(__dirname, './AppConfigs'),
    '@src': resolve(__dirname, './'),
  },

  compatibilityDate: '2025-01-30'
})