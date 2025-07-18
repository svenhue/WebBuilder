<template>
  <header class="tw-bg-red tw-border-b tw-border-gray-200 tw-px-6 tw-py-4">
    <div class="tw-flex tw-items-center tw-justify-between tw-max-w-7xl tw-mx-auto">
      <!-- Logo -->
      <div class="tw-flex tw-items-center">
        <NuxtLink to="/" class="tw-flex tw-items-center tw-space-x-2">
          <div class="tw-w-8 tw-h-8 tw-bg-black tw-text-white tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-lg">
            W
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="tw-hidden md:tw-flex tw-items-center tw-space-x-8">
        <NuxtLink 
          to="/home/dashboard" 
          class="tw-text-gray-900 tw-font-medium tw-px-3 tw-py-2 tw-border-b-2 tw-border-black tw-text-sm"
          :class="{ 'tw-border-black': $route.path.includes('/dashboard'), 'tw-border-transparent hover:tw-border-gray-300': !$route.path.includes('/dashboard') }"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/marketplace" 
          class="tw-text-gray-700 hover:tw-text-gray-900 tw-font-medium tw-px-3 tw-py-2 tw-border-b-2 tw-border-transparent hover:tw-border-gray-300 tw-text-sm tw-flex tw-items-center"
        >
          Marketplace
          <svg class="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </NuxtLink>
        <NuxtLink 
          to="/learn" 
          class="tw-text-gray-700 hover:tw-text-gray-900 tw-font-medium tw-px-3 tw-py-2 tw-border-b-2 tw-border-transparent hover:tw-border-gray-300 tw-text-sm"
        >
          Learn
        </NuxtLink>
        <NuxtLink 
          to="/resources" 
          class="tw-text-gray-700 hover:tw-text-gray-900 tw-font-medium tw-px-3 tw-py-2 tw-border-b-2 tw-border-transparent hover:tw-border-gray-300 tw-text-sm tw-flex tw-items-center"
        >
          Resources
          <svg class="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </NuxtLink>
      </nav>

      <!-- Right side - Notifications and Account -->
      <div class="tw-flex tw-items-center tw-space-x-4">
        <!-- Notifications -->
        <button class="tw-p-2 tw-text-gray-400 hover:tw-text-gray-600">
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.5L6 8h4v13l4.5-4.5" />
          </svg>
        </button>

        <!-- Account Dropdown -->
        <div class="tw-relative">
          <button 
            @click="toggleAccountMenu"
            class="tw-flex tw-items-center tw-space-x-2 tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm tw-font-medium"
          >
            <div class="tw-w-8 tw-h-8 tw-bg-purple-600 tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-sm tw-font-semibold">
              SN
            </div>
            <span>Account</span>
            <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Account Dropdown Menu -->
          <div 
            v-if="showAccountMenu"
            class="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-md tw-shadow-lg tw-py-1 tw-z-50 tw-border tw-border-gray-200"
          >
            <NuxtLink to="/profile" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
              Profile
            </NuxtLink>
            <NuxtLink to="/settings" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
              Settings
            </NuxtLink>
            <hr class="tw-my-1">
            <button @click="logout" class="tw-block tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu button -->
      <div class="md:tw-hidden">
        <button 
          @click="toggleMobileMenu"
          class="tw-p-2 tw-text-gray-400 hover:tw-text-gray-600"
        >
          <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="showMobileMenu" class="md:tw-hidden tw-mt-4 tw-border-t tw-border-gray-200 tw-pt-4">
      <div class="tw-space-y-2">
        <NuxtLink 
          to="/home/dashboard" 
          class="tw-block tw-px-3 tw-py-2 tw-text-gray-900 tw-font-medium tw-text-base"
          @click="closeMobileMenu"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/marketplace" 
          class="tw-block tw-px-3 tw-py-2 tw-text-gray-700 tw-font-medium tw-text-base"
          @click="closeMobileMenu"
        >
          Marketplace
        </NuxtLink>
        <NuxtLink 
          to="/learn" 
          class="tw-block tw-px-3 tw-py-2 tw-text-gray-700 tw-font-medium tw-text-base"
          @click="closeMobileMenu"
        >
          Learn
        </NuxtLink>
        <NuxtLink 
          to="/resources" 
          class="tw-block tw-px-3 tw-py-2 tw-text-gray-700 tw-font-medium tw-text-base"
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
  if (!event.target.closest('.tw-relative')) {
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
