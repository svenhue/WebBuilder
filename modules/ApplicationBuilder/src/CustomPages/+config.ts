import type { Config } from 'vike/types'

// https://vike.dev/config
export default {
  passToClient: ['pageProps', 'title'],
  clientRouting: true,
  prefetchStaticAssets: 'viewport',
  // https://vike.dev/meta
  meta: {
    // Create new config 'title'
    title: {
      env: { server: false, client: true }
    }
  },
  filesystemRoutingRoot: '/',
} satisfies Config
