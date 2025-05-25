// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path'
import { config } from './AppConfigs/pages'
const prefix = `monaco-editor/esm/vs`;

export default defineNuxtConfig({

  ssr: false, // Enable server-side rendering
  devtools: { enabled: true },
  modules:[/*'nuxt-electron',*/   'nuxt-monaco-editor', '@nuxt/ui','nuxt-quasar-ui', "@pinia/nuxt", "@nuxtjs/i18n",'@nuxtjs/tailwindcss',"alphaviewlibrary/nuxt", "hybridappdev/nuxt"],
  
  build: {
    transpile: ['monaco-editor'],
  },

  tailwindcss:{
    exposeConfig: true,
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config.ts',
    viewer: true,
  },
  quasar:{
    plugins: ['Notify']
  },

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
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
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
      },
      headers:{
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      
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
