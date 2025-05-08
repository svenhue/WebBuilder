import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { type AuthMiddlewareRouteOptions } from '../types'
import { useAuthState } from '../composables/useAuthState';


export default defineNuxtRouteMiddleware((to, from) => {
    
  const options = to.meta.auth as AuthMiddlewareRouteOptions
  
  if(!options || options?.requiresAuth === false){
    return;
  } 

  const { isAuthenticated } = useAuthState()

  if(!isAuthenticated.value){
    return navigateTo(options.redirect || '/auth/login')
  }

  })