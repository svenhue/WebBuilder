
import { defineStore } from 'pinia';
import { type IUserIdentity } from '../Services/Identity/IUserIdentity';

export const useIdentityStore = defineStore('identity', () => {

    const identity =  {} as IUserIdentity


    function isAuthenticated(state){
        return state.authenticated
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
