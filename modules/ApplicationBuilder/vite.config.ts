import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import vike from 'vike/plugin'
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import  { ViewLibrary }  from 'alphaviewlibrary/src/vitePlugin.js'

console.log(123, ViewLibrary)
const config = {
  
  plugins: [
    vike({ prerender: true }),
    vue({
      include: [/\.vue$/, /\.md$/],
      template: { transformAssetUrls}
    }),
    md({}),
    quasar(),
    ViewLibrary(),

    alias({
      entries: [
        { find: '@assets', replacement: resolve(__dirname, './src/assets') },
        { find: '@plugins', replacement: resolve(__dirname, './src/plugins') },
        { find: '@utils', replacement: resolve(__dirname, './utils') },
        { find : '@src', replacement: resolve(__dirname, './src')},
        { find : '@appconfig', replacement: resolve(__dirname, './renderer/app.config.json')}
      ]
    })
  ],
  ssr: {
    noExternal: ['lodash', 'quasar', 'alphautils', 'alphaviewlibrary', 'hybridappdev']
  },
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks Vike's CI
  optimizeDeps: { include: ['cross-fetch'], exclude:['alphautils', 'alphaviewlibrary'],  tsconfigRaw: {
    compilerOptions: {
      experimentalDecorators: true
    },
    esBuildOptions:{
      experimentalDecorators: true
    }
  }},
  /*
  resolve:{
    alias:{
      '#assets': resolve(__dirname, '/src/assets'),
    }
  }*/
}
export default config
