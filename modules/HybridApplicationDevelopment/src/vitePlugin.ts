export function HybridAppDevPlugin() {
    const virtualModuleId = 'virtual:hybridappdev'
    const resolvedVirtualModuleId = virtualModuleId
  
    return {
      name: 'hybridappdev', // required, will show up in warnings and errors
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
            console.log("load module")
          return `export * from ../index.ts"`
        }
      },
    }
  }