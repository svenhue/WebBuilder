import type { Config } from 'vike/types'
import { onHydrationEnd, onPageTransitionStart, onPageTransitionEnd } from './onPageTransitionHooks'

// https://vike.dev/config
export default {
  passToClient: ['pageProps', 'title'],
  clientRouting: true,
  prefetchStaticAssets: 'viewport',
  onHydrationEnd,
  onPageTransitionStart,
  onPageTransitionEnd,
  // https://vike.dev/meta
  meta: {
    // Create new config 'title'
    title: {
      //todo import configs from app.config.json -- for all configs
      env: { server: false, client: true }
    }
  },
  
  
} 
