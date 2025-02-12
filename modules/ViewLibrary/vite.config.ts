// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  
  build: {
  
     lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'alphaviewlibrary',
      // the proper extensions will be added
      fileName: 'alphaviewlibrary',
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
  plugins: [      vue({
    include: [/\.vue$/, /\.md$/] }), ]
})