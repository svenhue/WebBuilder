<template>
  <div class="min-h-screen bg-gray-50">

    <main class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
        <p class="text-gray-600">Tools, documentation, and resources to help you succeed</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Documentation Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Documentation</h2>
          <div class="space-y-3">
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">API Reference</h3>
                  <p class="text-sm text-gray-600">Complete API documentation and examples</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Component Library</h3>
                  <p class="text-sm text-gray-600">Browse all available components and their usage</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Best Practices</h3>
                  <p class="text-sm text-gray-600">Guidelines for building scalable applications</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Tools Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Developer Tools</h2>
          <div class="space-y-3">
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">CLI Tools</h3>
                  <p class="text-sm text-gray-600">Command line interface for project management</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">VS Code Extension</h3>
                  <p class="text-sm text-gray-600">Enhanced development experience in VS Code</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Design System</h3>
                  <p class="text-sm text-gray-600">Figma components and design tokens</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Community Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Community</h2>
          <div class="space-y-3">
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Discord Community</h3>
                  <p class="text-sm text-gray-600">Join our active developer community</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">GitHub Repository</h3>
                  <p class="text-sm text-gray-600">Contribute to the open source project</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Blog & Updates</h3>
                  <p class="text-sm text-gray-600">Latest news and feature announcements</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <!-- Support Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Support</h2>
          <div class="space-y-3">
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Help Center</h3>
                  <p class="text-sm text-gray-600">Find answers to common questions</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Contact Support</h3>
                  <p class="text-sm text-gray-600">Get help from our support team</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a href="#" class="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">Status Page</h3>
                  <p class="text-sm text-gray-600">Check system status and uptime</p>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Resources - WebUI Builder'
})
</script>
