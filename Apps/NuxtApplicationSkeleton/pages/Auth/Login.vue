<!-- filepath: c:\Projects\WEBUI\WebUI\WebBuilder\modules\HybridApplicationDevelopment\src\pages\Auth\Login.vue -->
<template>
  <div class="relative flex items-center justify-center min-h-screen bg-dark-page">
    <!-- Background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-info opacity-10 rounded-full blur-3xl animate-float-reverse"></div>
    </div>

    <!-- Login card -->
    <div class="w-full max-w-md p-8 space-y-6 bg-dark rounded-xl shadow-2xl z-10 backdrop-blur-sm bg-opacity-90 border border-gray-700 transition-all duration-300 card-glow">
      <!-- Logo/Icon -->
      <div class="flex justify-center mb-4">
        <div class="bg-gradient-animated w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-fontwhite" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-center text-fontwhite mb-6">Sign In</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-fontwhite font-medium">Email or Username</span>
          </label>
          <div class="relative">
            <input
              :style="{color: 'black'}"
              v-model="email"
              placeholder="your@email.com"
              class="input input-bordered w-full bg-gray-800 border-gray-600 text-fontwhite placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 input-glow"
              required
            />
          </div>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text text-fontwhite font-medium">Password</span>
          </label>
          <div class="relative">
            <input
            :style="{color: 'black'}"
              type="password"
              v-model="password"
              placeholder="••••••••"
              class="input input-bordered w-full bg-gray-800 border-gray-600 text-fontwhite placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 input-glow"
              required
            />
          </div>
          <label class="label justify-end">
            <a href="#" class="label-text-alt link link-hover text-info font-medium">Forgot password?</a>
          </label>
        </div>
        
        <div class="form-control">
          <label class="cursor-pointer label justify-start gap-3">
            <input type="checkbox" v-model="rememberMe" class="checkbox checkbox-primary checkbox-sm" />
            <span class="label-text text-fontwhite">Remember me</span>
          </label>
        </div>
        
        <button class="btn btn-primary w-full relative overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
          <span class="relative z-10 flex items-center justify-center gap-2 font-medium">
            Sign In
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <span class="absolute inset-0 bg-gradient-to-r from-primary via-purple to-primary bg-[length:200%] animate-shimmer opacity-80"></span>
        </button>
        
        <div class="divider text-xs text-fontwhite font-medium">OR CONTINUE WITH</div>
        
        <div class="flex gap-3">
          <button type="button" class="btn btn-outline flex-1 gap-2 border-gray-600 text-fontwhite hover:bg-primary/10 hover:border-primary transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button type="button" class="btn btn-outline flex-1 gap-2 border-gray-600 text-fontwhite hover:bg-primary/10 hover:border-primary transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
            Facebook
          </button>
        </div>
      </form>
      
      <p class="text-sm text-center text-fontwhite mt-6">
        Don't have an account? 
        <router-link to="/register" class="text-info hover:text-primary transition-colors duration-300 font-medium">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseServiceProvider, AuthenticationService } from 'webbuilderalphautils';
import { inject, ref } from 'vue'

  const  email = ref('')
  const password = ref()
  const  rememberMe = ref()

  const service = BaseServiceProvider.Service('AuthenticationService') as AuthenticationService

  async function handleLogin() {
      // Add your login logic here
    
    function successHandler(){
      useRouter().push('/')
    }


    await service.AuthenticateOAuth2(email.value, password.value, successHandler)
  };
</script>

<style scoped>
.bg-gradient-animated {
  background: linear-gradient(270deg, #181cb4, #31ccec);
  background-size: 200% 200%;
  animation: gradient-x 6s ease infinite;
}

.card-glow {
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.1), 0 0 30px rgba(49, 204, 236, 0.05);
}

.input-glow:focus {
  box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.3), 0 0 8px rgba(79, 70, 229, 0.2);
}

@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float 18s ease-in-out infinite reverse;
}

.animate-shimmer {
  animation: shimmer 3s infinite linear;
  background-position: 0% 0%;
}

@keyframes shimmer {
  to {
    background-position: 200% 0%;
  }
}
</style>
