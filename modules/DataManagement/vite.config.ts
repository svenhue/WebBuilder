// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  ssr: {
    noExternal: ['monaco-editor']
    //,external: ['alphaviewlibrary']
  },
  build: {

     lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'hybridappdev',
      // the proper extensions will be added
      fileName: 'index',
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'quasar', 'lodash'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps

        globals: {
          vue: 'vue',
          quasar: 'quasar',
          lodash: 'lodash'
        },
      },
    }, 
    
  },
  plugins: [vue()]
})