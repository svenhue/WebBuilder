
import { defineStore } from 'pinia';
import { type IUserIdentity } from '../Services/Identity/IUserIdentity';
import { reactive, ref } from 'vue';

export const useIdentityStore = defineStore('identity', () => {

    const identity = ref<IUserIdentity>({})
    const isAuthenticatedBool = ref(false)

    function isAuthenticated(){
        return isAuthenticatedBool.value
    }
        
    function getIdentity(){
        return identity
    }
    function setIdentity (i) {
        identity.value = i;
    }
    function setIsAuthenticated (isAuthenticated) {
        isAuthenticatedBool.value = isAuthenticated;
    }
    return {
        getIdentity,
        setIdentity,
        isAuthenticated,
        setIsAuthenticated
    }
})
