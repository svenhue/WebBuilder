// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { config } from './AppConfigs/pages'
const prefix = `monaco-editor/esm/vs`;

export default defineNuxtConfig({
  //ssr: config.ssr, // todo handle devapi
  compatibilityDate: "2014-12-13",
  devtools: { enabled: true },
  modules:['nuxt-quasar-ui', "@pinia/nuxt", "@nuxtjs/i18n"],
  quasar:{
    plugins: ['Notify'],
    sassVariables: './css/sassvariables.scss'
  },
  hooks:{
    'nitro:build:before':(nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata')
    }
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
    debug:true,
    prerender:{
      failOnError:true,
      
    },
    routeRules:{
    
    }
  },

  vite: {
/*    resolve: {
      alias:{
        "alphautils": "webbuilderalphautils"
      }
    },
    */
    plugins: [nodePolyfills()],
    server:{
      headers:{
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      
      }
    },
    optimizeDeps:{
      force:true,
      exclude: ['alphautils', 'hybridappdev', 'alphaviewlibrary', 'jszip', '@webcontainer', "vue-i18n",'@webcontainer' ],

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
  }
})