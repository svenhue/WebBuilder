// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path'
import { config } from './AppConfigs/pages'
const prefix = `monaco-editor/esm/vs`;
export default defineNuxtConfig({
  sourcemap:{
    server: true,
    client: true
  },

  ssr: false,
  devtools: { enabled: true },
  modules:[/*'nuxt-electron',*/ 'nuxt-quasar-ui', "@pinia/nuxt", "@nuxtjs/i18n",'@nuxtjs/tailwindcss',"alphaviewlibrary/nuxt", "hybridappdev/nuxt", "webautomateintelligence/nuxt"],

  tailwindcss:{
    exposeConfig: true,
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config.ts',
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
  },
  quasar:{
    plugins: ['Notify']
  },

  i18n:{
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
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
      force: true,
      exclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary',  '@webcontainer', "vue-i18n",'@webcontainer' ],

      //only requiredexclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary', 'file-saver', 'jszip', '@webcontainer'],
      esbuildOptions: {
      
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      },
      include: [
        `${prefix}/language/json/json.worker`,
        `${prefix}/language/css/css.worker`,
        `${prefix}/language/html/html.worker`,
        `${prefix}/language/typescript/ts.worker`,
        `${prefix}/editor/editor.worker`,
      ]
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