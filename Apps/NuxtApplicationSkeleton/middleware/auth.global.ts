import { useIdentityStore } from "webbuilderalphautils/stores/useIdentityStore.ts"
export default defineNuxtRouteMiddleware((to, from) => {
 
    if(to.meta?.auth?.requiresAuth != true){
        return
    }else{
        const store = useIdentityStore()
        if(!store.isAuthenticated()){
            return navigateTo('/auth/login')
        }
    }
})