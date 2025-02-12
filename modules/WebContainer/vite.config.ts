// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps:{
    include: ['alphautils']
  },
  build: {
    commonjsOptions:{
      include: ['alphautils']
    },
     lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'webcontainer',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'quasar', 'lodash', 'alphaviewlibrary'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue',
          quasar: 'quasar',
          lodash: 'lodash',
            alphaviewlibrary: 'alphaviewlibrary'
        },
      },
    }, 
    
  }
})