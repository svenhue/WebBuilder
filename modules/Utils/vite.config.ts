// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'alphautils',
      // the proper extensions will be added
      fileName: 'index',
    
    },
    
    outDir: 'dist',
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'quasar', 'axios', 'pinia', 'lodash-es', 'inversify'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue',
          quasar: 'quasar',
          axios: 'axios',
          pinia: 'pinia',
          'lodash-es': 'lodash-es',
          inversify: 'inversify'
          
        },
      },
    },
  },
})