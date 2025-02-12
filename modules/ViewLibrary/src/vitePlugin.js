
export function ViewLibrary(){

    const virtualModuleId = 'virtual:alphaviewlibrary'
    const resolvedVirtualModuleId = '\0'+ virtualModuleId
    
    return {
        name: 'my-plugin', // required, will show up in warnings and errors
        resolveId(id) {
        if (id === virtualModuleId) {
            return resolvedVirtualModuleId
        }
        },
        load(id) {
        if (id === resolvedVirtualModuleId) {
            return `export {ButtonComponent} from 'alphaviewlibrary'`
        }
        }
    }
}