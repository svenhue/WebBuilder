<template>
  <div class="min-h-screen bg-gray-50">

    
    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p class="text-gray-600">Discover tutorials, guides, and resources to help you build better websites</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tutorial Card 1 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
          <p class="text-gray-600 text-sm mb-4">Learn the basics of building your first website with our platform</p>
          <button class="text-blue-600 text-sm font-medium hover:text-blue-700">
            Start Tutorial →
          </button>
        </div>

        <!-- Tutorial Card 2 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Advanced Components</h3>
          <p class="text-gray-600 text-sm mb-4">Master advanced component creation and customization techniques</p>
          <button class="text-blue-600 text-sm font-medium hover:text-blue-700">
            Start Tutorial →
          </button>
        </div>

        <!-- Tutorial Card 3 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Performance Optimization</h3>
          <p class="text-gray-600 text-sm mb-4">Learn how to optimize your websites for speed and performance</p>
          <button class="text-blue-600 text-sm font-medium hover:text-blue-700">
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
