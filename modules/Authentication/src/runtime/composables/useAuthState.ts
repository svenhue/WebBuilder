import { useState } from "nuxt/app";

export function useAuthState(){

    const state = useState('auth:session', () => undefined)
    const user = useState('auth:user', () => undefined)
    const token = useState('auth:token', () => undefined)
    const isAuthenticated = useState('auth:isAuthenticated', () => false)
    const isLoading = useState('auth:isLoading', () => false)
    const error = useState('auth:error', () => undefined)
    
    
    return {
        state,
        user,
        token,
        isAuthenticated,
        isLoading,
        error
    }
}