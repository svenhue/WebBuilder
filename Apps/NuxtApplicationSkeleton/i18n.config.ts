import { config } from './AppConfigs/pages'
import  en   from './AppConfigs/languages/en-US.json' 
import de from './AppConfigs/languages/de.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale:config.internationalization?.defaultLocale,
    defaultLocale: config.internationalization?.defaultLocale,
    locales: config.internationalization?.locales,
    langDir: config.internationalization?.langDir,
    messages:{
      en,
      de
    },
    
  }))