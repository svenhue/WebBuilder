// https://nuxt.com/docs/api/configuration/nuxt-config
import typescript from '@rollup/plugin-typescript'
import { resolve } from 'path'
import { config } from './AppConfigs/pages'
const prefix = `monaco-editor/esm/vs`;
export default defineNuxtConfig({
  ssr: config.deploymentMode == 'spaclient' ? false : true,
  
  devtools: { enabled: true },
  modules:['nuxt-quasar-ui', "@pinia/nuxt", "@nuxtjs/i18n"],
  quasar:{
    plugins: ['Notify'],
    sassVariables: './css/sassvariables.scss'
  },
  i18n:{
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  router:{
    base
  },
  nitro:{
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
    
    server:{
      headers:{
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      
      }
    },
    optimizeDeps:{
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