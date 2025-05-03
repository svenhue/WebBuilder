
import { defineStore } from 'pinia';
import { type IUserIdentity } from '../Services/Identity/IUserIdentity';

export const useIdentityStore = defineStore('identity', () => {

    const identity =  {} as IUserIdentity
    const isAuthenticatedBool = false

    function isAuthenticated(){
        return isAuthenticatedBool
    }
        
    function getIdentity(){
        return identity
    }
    function setIdentity (identity) {
        identity = identity;
    }
    
    return {
        getIdentity,
        setIdentity,
        isAuthenticated
    }
})
