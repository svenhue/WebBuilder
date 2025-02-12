import { App } from 'vue'
import { plugin } from './types/plugin'
import * as pluginfiles from '@src/plugins/index.ts'

export function installPlugins(app: App, plugins: Array<plugin>) {

    for(var plugin in plugins){
        pluginfiles.default[plugin](app);    
    }
    
}