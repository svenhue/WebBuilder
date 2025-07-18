<template>
  <aside class="tw-w-64 tw-bg-white tw-border-r tw-border-gray-200 tw-min-h-screen">
    <div class="tw-p-6">
      <!-- Workspace Selector -->
      <div class="tw-mb-6">
        <div class="tw-relative">
          <button 
            @click="toggleWorkspaceMenu"
            class="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-gray-50 tw-rounded-lg tw-text-left hover:tw-bg-gray-100 tw-transition-colors"
          >
            <div class="tw-flex tw-items-center tw-space-x-3">
              <div class="tw-w-8 tw-h-8 tw-bg-gray-400 tw-rounded tw-flex tw-items-center tw-justify-center">
                <svg class="tw-w-4 tw-h-4 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1" />
                </svg>
              </div>
              <div>
                <p class="tw-text-sm tw-font-medium tw-text-gray-900">Sven's Workspace</p>
              </div>
            </div>
            <svg class="tw-w-4 tw-h-4 tw-text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Workspace Dropdown -->
          <div 
            v-if="showWorkspaceMenu"
            class="tw-absolute tw-top-full tw-left-0 tw-right-0 tw-mt-2 tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-200 tw-py-2 tw-z-50"
          >
            <button class="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
              Switch workspace
            </button>
            <button class="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100">
              Create new workspace
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="tw-space-y-1">
        <!-- All Sites -->
        <NuxtLink 
          to="/sites" 
          class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
          :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/sites') }"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>All sites</span>
        </NuxtLink>

        <!-- Tutorials -->
        <NuxtLink 
          to="/tutorials" 
          class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
          :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/tutorials') }"
        >
          <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Tutorials</span>
        </NuxtLink>
      </nav>

      <!-- Settings Section -->
      <div class="tw-mt-8">
        <h3 class="tw-px-3 tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase tw-tracking-wider tw-mb-3">
          Settings
        </h3>
        <nav class="tw-space-y-1">
          <!-- General -->
          <NuxtLink 
            to="/settings/general" 
            class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/settings/general') }"
          >
            <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>General</span>
          </NuxtLink>

          <!-- Team -->
          <NuxtLink 
            to="/settings/team" 
            class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/settings/team') }"
          >
            <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>Team</span>
          </NuxtLink>

          <!-- Plans -->
          <NuxtLink 
            to="/settings/plans" 
            class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/settings/plans') }"
          >
            <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Plans</span>
          </NuxtLink>

          <!-- Billing -->
          <NuxtLink 
            to="/settings/billing" 
            class="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            :class="{ 'tw-bg-gray-100 tw-text-gray-900': $route.path.includes('/settings/billing') }"
          >
            <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Billing</span>
          </NuxtLink>

          <!-- Apps & Integrations -->
          <button 
            @click="toggleAppsMenu"
            class="tw-w-full tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
          >
            <div class="tw-flex tw-items-center tw-space-x-3">
              <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Apps & Integrations</span>
            </div>
            <svg 
              class="tw-w-4 tw-h-4 tw-transition-transform"
              :class="{ 'tw-rotate-180': showAppsMenu }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Apps Submenu -->
          <div v-if="showAppsMenu" class="tw-ml-8 tw-space-y-1">
            <NuxtLink 
              to="/settings/apps/installed" 
              class="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-gray-600 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            >
              Installed Apps
            </NuxtLink>
            <NuxtLink 
              to="/settings/apps/marketplace" 
              class="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-gray-600 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            >
              App Marketplace
            </NuxtLink>
          </div>

          <!-- Libraries & Templates -->
          <button 
            @click="toggleLibrariesMenu"
            class="tw-w-full tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
          >
            <div class="tw-flex tw-items-center tw-space-x-3">
              <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Libraries & Templates</span>
            </div>
            <svg 
              class="tw-w-4 tw-h-4 tw-transition-transform"
              :class="{ 'tw-rotate-180': showLibrariesMenu }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Libraries Submenu -->
          <div v-if="showLibrariesMenu" class="tw-ml-8 tw-space-y-1">
            <NuxtLink 
              to="/settings/libraries/components" 
              class="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-gray-600 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            >
              Component Library
            </NuxtLink>
            <NuxtLink 
              to="/settings/libraries/templates" 
              class="tw-block tw-px-3 tw-py-2 tw-text-sm tw-text-gray-600 tw-rounded-lg hover:tw-bg-gray-100 tw-transition-colors"
            >
              Page Templates
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const showWorkspaceMenu = ref(false)
const showAppsMenu = ref(false)
const showLibrariesMenu = ref(false)

const toggleWorkspaceMenu = () => {
  showWorkspaceMenu.value = !showWorkspaceMenu.value
}

const toggleAppsMenu = () => {
  showAppsMenu.value = !showAppsMenu.value
}

const toggleLibrariesMenu = () => {
  showLibrariesMenu.value = !showLibrariesMenu.value
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.tw-relative')) {
    showWorkspaceMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
