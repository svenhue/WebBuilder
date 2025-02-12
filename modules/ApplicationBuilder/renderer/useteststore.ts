
import { defineStore } from "alphautils/stores/piniapi.ts";


export const useteststore = defineStore('app',{

    state: () => ({
        tabs: Array<object>(),
        
        dataContexts: Array<number>()
    }),
    getters: {
        getAllTabs: (state) => {
            
            return state.tabs;
        }
    },
    actions: {
        createDataContext(): number{
            if(this.dataContexts.length === 0){
                this.dataContexts.push(1)
                return 1;
            }else{
                const id = this.dataContexts[this.dataContexts.length - 1] + 1;
                this.dataContexts.push(id)
                return id
            }
        }
    }
})
