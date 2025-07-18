<template>
  <div class="tw-min-h-screen tw-bg-gray-50">
    <!-- Header Component -->

    <div class="tw-flex">
 
      <!-- Main Content Area -->
      <main class="tw-flex-1 tw-p-8">
        <div class="tw-max-w-7xl tw-mx-auto">
          <!-- Page Header -->
          <div class="tw-mb-8">
            <h1 class="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-2">Sven's Workspace</h1>
            <p class="tw-text-gray-600">Welcome to your dashboard</p>
          </div>

          <!-- Dashboard Content Grid -->
          <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
            <!-- Main Content Card -->
            <div class="lg:tw-col-span-2">
              <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
                <h2 class="tw-text-xl tw-font-semibold tw-text-gray-900 tw-mb-4">Recent Activity</h2>
                <div class="tw-space-y-4">
                  <div class="tw-flex tw-items-center tw-space-x-3 tw-p-3 tw-bg-gray-50 tw-rounded-lg">
                    <div class="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full"></div>
                    <span class="tw-text-gray-700">Project "WebUI Builder" updated</span>
                    <span class="tw-text-sm tw-text-gray-500 tw-ml-auto">2 hours ago</span>
                  </div>
                  <div class="tw-flex tw-items-center tw-space-x-3 tw-p-3 tw-bg-gray-50 tw-rounded-lg">
                    <div class="tw-w-2 tw-h-2 tw-bg-blue-500 tw-rounded-full"></div>
                    <span class="tw-text-gray-700">New template created</span>
                    <span class="tw-text-sm tw-text-gray-500 tw-ml-auto">5 hours ago</span>
                  </div>
                  <div class="tw-flex tw-items-center tw-space-x-3 tw-p-3 tw-bg-gray-50 tw-rounded-lg">
                    <div class="tw-w-2 tw-h-2 tw-bg-purple-500 tw-rounded-full"></div>
                    <span class="tw-text-gray-700">Team member invited</span>
                    <span class="tw-text-sm tw-text-gray-500 tw-ml-auto">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar Content -->
            <div class="tw-space-y-6">
              <!-- Quick Stats -->
              <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
                <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">Quick Stats</h3>
                <div class="tw-space-y-3">
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray-600">Active Projects</span>
                    <span class="tw-font-semibold tw-text-gray-900">12</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray-600">Templates</span>
                    <span class="tw-font-semibold tw-text-gray-900">8</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray-600">Team Members</span>
                    <span class="tw-font-semibold tw-text-gray-900">5</span>
                  </div>
                </div>
              </div>

              <!-- Recent Projects -->
              <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
                <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">Recent Projects</h3>
                <div class="tw-space-y-3">
                  <div class="tw-flex tw-items-center tw-space-x-3">
                    <div class="tw-w-8 tw-h-8 tw-bg-blue-100 tw-rounded tw-flex tw-items-center tw-justify-center">
                      <span class="tw-text-blue-600 tw-text-sm tw-font-semibold">W</span>
                    </div>
                    <div>
                      <p class="tw-text-sm tw-font-medium tw-text-gray-900">WebUI Builder</p>
                      <p class="tw-text-xs tw-text-gray-500">Updated 2h ago</p>
                    </div>
                  </div>
                  <div class="tw-flex tw-items-center tw-space-x-3">
                    <div class="tw-w-8 tw-h-8 tw-bg-green-100 tw-rounded tw-flex tw-items-center tw-justify-center">
                      <span class="tw-text-green-600 tw-text-sm tw-font-semibold">A</span>
                    </div>
                    <div>
                      <p class="tw-text-sm tw-font-medium tw-text-gray-900">API Gateway</p>
                      <p class="tw-text-xs tw-text-gray-500">Updated 1d ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Dashboard - Sven\'s Workspace'
})
</script>
