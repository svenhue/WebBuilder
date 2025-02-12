
import { defineStore } from 'pinia';


export const useIdentityStore = defineStore('identity',{

    state: () => ({
        authenticated: false,
        user: {},

    }),
    getters: {
        isAuthenticated: (state) => state.authenticated,
        
    },
    actions: {

    }
})
