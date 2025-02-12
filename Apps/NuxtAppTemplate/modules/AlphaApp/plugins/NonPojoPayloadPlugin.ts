import { Page, ViewElement, VueApplication } from "alphautils"
import { BODeclarationContainer } from "alphautils"
import { UITreeProviderService } from "alphaviewlibrary/src/renderer/UITreeProviderService.js"
//import { CommandPaletteViewModel } from "hybridappdev"

export default definePayloadPlugin(() => {
   
  definePayloadReducer('BODeclarationContainer', data => {

        
        if(data instanceof UITreeProviderService){
            console.log('reducerTree', data)
        }else if(data instanceof Page){
            console.log('reducerPage', data)
        }else if (data instanceof VueApplication){
            console.log('reducerVueApp', data)
        }else if(data instanceof ViewElement){
            console.log('reducerViewElement', data)
        }else if(data instanceof BODeclarationContainer){
       
            return JSON.parse(JSON.stringify(data))
        }
        
        
    })
    definePayloadReducer('CommandPaletteViewModel', data => {
        
        
    })
    definePayloadReviver('BODeclarationContainer', data => {
      //because alphautils vueapp sets this class as state in a pinia store
      if(data instanceof BODeclarationContainer){
        return new BODeclarationContainer(data)
      }
    })
    definePayloadReviver('CommandPaletteViewModel', data => {
        //because alphautils vueapp sets this class as state in a pinia store
        if(data instanceof BODeclarationContainer){
          return new BODeclarationContainer(data)
        }
      })

})