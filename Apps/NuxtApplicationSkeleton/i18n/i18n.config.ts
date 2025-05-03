import { config } from '../AppConfigs/pages'


export default defineI18nConfig(() => ({
    legacy: false,
    locale:config.internationalization?.defaultLocale,
    defaultLocale: config.internationalization?.defaultLocale,
    locales: config.internationalization?.locales,
    langDir: config.internationalization?.langDir
    
  }))