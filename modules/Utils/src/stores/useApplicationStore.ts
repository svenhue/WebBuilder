
import { defineStore } from 'pinia';
import { BODeclarationContainer } from '../Container/BODeclarationContainer.js';



export const useApplicationStore = defineStore('app',{

    state: () => ({
        user: {},
        boDeclarations:  new BODeclarationContainer(),
        dataContexts: Array<number>(),
        devSettings: {}
    }),
    getters: {

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
