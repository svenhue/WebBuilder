<template>
  <header class="bg-red border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between max-w-7xl mx-auto">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-lg">
            W
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink 
          to="/home/dashboard" 
          class="text-gray-900 font-medium px-3 py-2 border-b-2 border-black text-sm"
          :class="{ 'border-black': $route.path.includes('/dashboard'), 'border-transparent hover:border-gray-300': !$route.path.includes('/dashboard') }"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/marketplace" 
          class="text-gray-700 hover:text-gray-900 font-medium px-3 py-2 border-b-2 border-transparent hover:border-gray-300 text-sm flex items-center"
        >
          Marketplace
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </NuxtLink>
        <NuxtLink 
          to="/learn" 
          class="text-gray-700 hover:text-gray-900 font-medium px-3 py-2 border-b-2 border-transparent hover:border-gray-300 text-sm"
        >
          Learn
        </NuxtLink>
        <NuxtLink 
          to="/resources" 
          class="text-gray-700 hover:text-gray-900 font-medium px-3 py-2 border-b-2 border-transparent hover:border-gray-300 text-sm flex items-center"
        >
          Resources
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </NuxtLink>
      </nav>

      <!-- Right side - Notifications and Account -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button class="p-2 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.5L6 8h4v13l4.5-4.5" />
          </svg>
        </button>

        <!-- Account Dropdown -->
        <div class="relative">
          <button 
            @click="toggleAccountMenu"
            class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
          >
            <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              SN
            </div>
            <span>Account</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Account Dropdown Menu -->
          <div 
            v-if="showAccountMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          >
            <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </NuxtLink>
            <NuxtLink to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </NuxtLink>
            <hr class="my-1">
            <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button 
          @click="toggleMobileMenu"
          class="p-2 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="showMobileMenu" class="md:hidden mt-4 border-t border-gray-200 pt-4">
      <div class="space-y-2">
        <NuxtLink 
          to="/home/dashboard" 
          class="block px-3 py-2 text-gray-900 font-medium text-base"
          @click="closeMobileMenu"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/marketplace" 
          class="block px-3 py-2 text-gray-700 font-medium text-base"
          @click="closeMobileMenu"
        >
          Marketplace
        </NuxtLink>
        <NuxtLink 
          to="/learn" 
          class="block px-3 py-2 text-gray-700 font-medium text-base"
          @click="closeMobileMenu"
        >
          Learn
        </NuxtLink>
        <NuxtLink 
          to="/resources" 
          class="block px-3 py-2 text-gray-700 font-medium text-base"
          @click="closeMobileMenu"
        >
          Resources
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showAccountMenu = ref(false)
const showMobileMenu = ref(false)

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const logout = () => {
  // Implement logout logic here
  console.log('Logout clicked')
  showAccountMenu.value = false
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showAccountMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
