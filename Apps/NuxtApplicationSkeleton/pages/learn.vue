<template>
  <div class="tw-min-h-screen tw-bg-gray-50">

    
    <main class="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-8">
      <div class="tw-mb-8">
        <h1 class="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-2">Learn</h1>
        <p class="tw-text-gray-600">Discover tutorials, guides, and resources to help you build better websites</p>
      </div>

      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
        <!-- Tutorial Card 1 -->
        <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
          <div class="tw-w-12 tw-h-12 tw-bg-blue-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mb-4">
            <svg class="tw-w-6 tw-h-6 tw-text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2">Getting Started</h3>
          <p class="tw-text-gray-600 tw-text-sm tw-mb-4">Learn the basics of building your first website with our platform</p>
          <button class="tw-text-blue-600 tw-text-sm tw-font-medium hover:tw-text-blue-700">
            Start Tutorial →
          </button>
        </div>

        <!-- Tutorial Card 2 -->
        <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
          <div class="tw-w-12 tw-h-12 tw-bg-green-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mb-4">
            <svg class="tw-w-6 tw-h-6 tw-text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2">Advanced Components</h3>
          <p class="tw-text-gray-600 tw-text-sm tw-mb-4">Master advanced component creation and customization techniques</p>
          <button class="tw-text-blue-600 tw-text-sm tw-font-medium hover:tw-text-blue-700">
            Start Tutorial →
          </button>
        </div>

        <!-- Tutorial Card 3 -->
        <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-border-gray-200 tw-p-6">
          <div class="tw-w-12 tw-h-12 tw-bg-purple-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mb-4">
            <svg class="tw-w-6 tw-h-6 tw-text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2">Performance Optimization</h3>
          <p class="tw-text-gray-600 tw-text-sm tw-mb-4">Learn how to optimize your websites for speed and performance</p>
          <button class="tw-text-blue-600 tw-text-sm tw-font-medium hover:tw-text-blue-700">
            Start Tutorial →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Learn - WebUI Builder'
})
</script>
