<template>
  <div class="tw-min-h-screen tw-bg-dark-page">
    <!-- Loading State -->
    <div v-if="loading" class="tw-flex tw-items-center tw-justify-center tw-min-h-screen">
      <div class="tw-animate-spin tw-rounded-full tw-h-32 tw-w-32 tw-border-b-2 tw-border-primary"></div>
    </div>

    <!-- Template Detail -->
    <div v-else-if="template" class="tw-pb-20">
      <!-- Header -->
      <section class="tw-bg-dark tw-py-8 tw-px-6">
        <div class="tw-max-w-7xl tw-mx-auto">
          <!-- Breadcrumb -->
          <nav class="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-mb-6">
            <NuxtLink to="/marketplace" class="tw-text-gray hover:tw-text-fontwhite tw-transition-colors">
              Marketplace
            </NuxtLink>
            <Icon name="heroicons:mdi:chevron-right" class="tw-w-4 tw-h-4 tw-text-gray" />
            <span class="tw-text-gray tw-capitalize">{{ template.category }}</span>
            <Icon name="heroicons:mdi:chevron-right" class="tw-w-4 tw-h-4 tw-text-gray" />
            <span class="tw-text-fontwhite">{{ template.name }}</span>
          </nav>

          <!-- Template Header -->
          <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-8 tw-items-start">
            <div class="tw-flex-1">
              <h1 class="tw-text-4xl tw-font-bold tw-text-fontwhite tw-mb-4">
                {{ template.name }}
              </h1>
              <p class="tw-text-xl tw-text-gray tw-mb-6">
                {{ template.description }}
              </p>
              
              <!-- Author & Stats -->
              <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-6 tw-mb-6">
                <div class="tw-flex tw-items-center tw-gap-3">
                  <img
                    :src="template.author.avatar"
                    :alt="template.author.name"
                    class="tw-w-10 tw-h-10 tw-rounded-full"
                  />
                  <div>
                    <div class="tw-text-fontwhite tw-font-medium">{{ template.author.name }}</div>
                    <div class="tw-text-gray tw-text-sm">Template Creator</div>
                  </div>
                </div>
                
                <div class="tw-flex tw-items-center tw-gap-4 tw-text-sm">
                  <div class="tw-flex tw-items-center tw-gap-1">
                    <Icon name="heroicons:star" class="tw-w-4 tw-h-4 tw-text-yellow" />
                    <span class="tw-text-fontwhite">{{ template.rating.toFixed(1) }}</span>
                    <span class="tw-text-gray">({{ template.reviews || 0 }} reviews)</span>
                  </div>
                  <div class="tw-flex tw-items-center tw-gap-1">
                    <Icon name="heroicons:arrow-down-tray" class="tw-w-4 tw-h-4 tw-text-gray" />
                    <span class="tw-text-gray">{{ formatNumber(template.downloads) }} downloads</span>
                  </div>
                  <div class="tw-flex tw-items-center tw-gap-1">
                    <Icon name="heroicons:calendar" class="tw-w-4 tw-h-4 tw-text-gray" />
                    <span class="tw-text-gray">Updated {{ formatDate(template.updatedAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="tw-flex tw-flex-wrap tw-gap-2">
                <span
                  v-for="tag in template.tags"
                  :key="tag"
                  class="tw-px-3 tw-py-1 tw-bg-brightgrey tw-text-gray tw-text-sm tw-rounded-full tw-capitalize"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Price & Actions -->
            <div class="tw-w-full lg:tw-w-80 tw-bg-brightgrey tw-rounded-xl tw-p-6">
              <div class="tw-text-center tw-mb-6">
                <div class="tw-text-3xl tw-font-bold tw-text-fontwhite tw-mb-2">
                  {{ template.isFree ? 'Free' : `$${template.price}` }}
                </div>
                <div class="tw-text-gray tw-text-sm">
                  {{ template.isFree ? 'Download for free' : 'One-time purchase' }}
                </div>
              </div>

              <div class="tw-space-y-3">
                <button
                  @click="downloadTemplate"
                  :disabled="downloading"
                  class="tw-w-full tw-px-6 tw-py-4 tw-bg-primary tw-text-fontwhite tw-rounded-lg tw-font-semibold hover:tw-bg-primary/90 tw-transition-colors disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                  <Icon v-if="downloading" name="heroicons:arrow-path" class="tw-w-5 tw-h-5 tw-inline tw-mr-2 tw-animate-spin" />
                  <Icon v-else name="heroicons:arrow-down-tray" class="tw-w-5 tw-h-5 tw-inline tw-mr-2" />
                  {{ downloading ? 'Downloading...' : (template.isFree ? 'Download Free' : 'Purchase & Download') }}
                </button>
                
                <button
                  @click="previewTemplate"
                  class="tw-w-full tw-px-6 tw-py-4 tw-border-2 tw-border-primary tw-text-primary tw-rounded-lg tw-font-semibold hover:tw-bg-primary hover:tw-text-fontwhite tw-transition-colors"
                >
                  <Icon name="heroicons:eye" class="tw-w-5 tw-h-5 tw-inline tw-mr-2" />
                  Live Preview
                </button>
                
                <button
                  @click="toggleFavorite"
                  :class="[
                    'tw-w-full tw-px-6 tw-py-4 tw-rounded-lg tw-font-semibold tw-transition-colors',
                    isFavorite
                      ? 'tw-bg-red-500 tw-text-fontwhite hover:tw-bg-red-600'
                      : 'tw-bg-darkgrey tw-text-gray hover:tw-bg-gray hover:tw-text-fontwhite'
                  ]"
                >
                  <Icon name="heroicons:heart" :class="isFavorite ? 'tw-fill-current' : ''" class="tw-w-5 tw-h-5 tw-inline tw-mr-2" />
                  {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                </button>
              </div>

              <!-- Template Info -->
              <div class="tw-mt-6 tw-pt-6 tw-border-t tw-border-darkgrey">
                <h3 class="tw-text-fontwhite tw-font-semibold tw-mb-4">Template Details</h3>
                <div class="tw-space-y-3 tw-text-sm">
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray">Category</span>
                    <span class="tw-text-fontwhite tw-capitalize">{{ template.category }}</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray">Pages</span>
                    <span class="tw-text-fontwhite">{{ template.pageCount || 5 }}</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray">Components</span>
                    <span class="tw-text-fontwhite">{{ template.componentCount || 25 }}</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray">Responsive</span>
                    <span class="tw-text-green">✓ Yes</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                    <span class="tw-text-gray">Browser Support</span>
                    <span class="tw-text-green">✓ All Modern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Preview Images -->
      <section class="tw-py-16 tw-px-6">
        <div class="tw-max-w-7xl tw-mx-auto">
          <h2 class="tw-text-3xl tw-font-bold tw-text-fontwhite tw-mb-8">Preview</h2>
          
          <!-- Main Preview -->
          <div class="tw-mb-8">
            <img
              :src="currentPreviewImage"
              :alt="`${template.name} preview`"
              class="tw-w-full tw-rounded-xl tw-shadow-2xl"
              loading="lazy"
            />
          </div>

          <!-- Preview Thumbnails -->
          <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 tw-gap-4">
            <button
              v-for="(image, index) in allPreviewImages"
              :key="index"
              @click="currentPreviewImage = image"
              :class="[
                'tw-aspect-[4/3] tw-rounded-lg tw-overflow-hidden tw-border-2 tw-transition-all',
                currentPreviewImage === image
                  ? 'tw-border-primary tw-shadow-lg'
                  : 'tw-border-transparent hover:tw-border-gray'
              ]"
            >
              <img
                :src="image"
                :alt="`Preview ${index + 1}`"
                class="tw-w-full tw-h-full tw-object-cover"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="tw-py-16 tw-px-6 tw-bg-dark">
        <div class="tw-max-w-7xl tw-mx-auto">
          <h2 class="tw-text-3xl tw-font-bold tw-text-fontwhite tw-mb-8">What's Included</h2>
          
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            <div
              v-for="feature in templateFeatures"
              :key="feature.title"
              class="tw-bg-brightgrey tw-rounded-lg tw-p-6"
            >
              <div class="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                <Icon :name="feature.icon" class="tw-w-6 tw-h-6 tw-text-primary" />
                <h3 class="tw-text-fontwhite tw-font-semibold">{{ feature.title }}</h3>
              </div>
              <p class="tw-text-gray tw-text-sm">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Templates -->
      <section class="tw-py-16 tw-px-6">
        <div class="tw-max-w-7xl tw-mx-auto">
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-8">
            <h2 class="tw-text-3xl tw-font-bold tw-text-fontwhite">Related Templates</h2>
            <NuxtLink
              :to="`/marketplace?category=${template.category}`"
              class="tw-text-primary hover:tw-text-primary/80 tw-transition-colors"
            >
              View all {{ template.category }} templates →
            </NuxtLink>
          </div>
          
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
            <TemplateCard
              v-for="relatedTemplate in relatedTemplates"
              :key="relatedTemplate.id"
              :template="relatedTemplate"
              view-mode="grid"
              @click="navigateToTemplate(relatedTemplate)"
              @favorite="toggleTemplateFavorite(relatedTemplate)"
              @preview="previewRelatedTemplate(relatedTemplate)"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Template Not Found -->
    <div v-else class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen tw-text-center">
      <Icon name="heroicons:exclamation-triangle" class="tw-w-16 tw-h-16 tw-text-gray tw-mb-4" />
      <h1 class="tw-text-2xl tw-font-bold tw-text-fontwhite tw-mb-2">Template Not Found</h1>
      <p class="tw-text-gray tw-mb-6">The template you're looking for doesn't exist or has been removed.</p>
      <NuxtLink
        to="/marketplace"
        class="tw-px-6 tw-py-3 tw-bg-primary tw-text-fontwhite tw-rounded-lg tw-font-semibold hover:tw-bg-primary/90 tw-transition-colors"
      >
        Back to Marketplace
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Types
interface Template {
  id: string
  name: string
  description: string
  price: number
  isFree: boolean
  isPublic: boolean
  thumbnail: string
  previewImages: string[]
  author: {
    id: string
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  downloads: number
  rating: number
  reviews?: number
  pageCount?: number
  componentCount?: number
  createdAt: string
  updatedAt: string
}

interface Feature {
  title: string
  description: string
  icon: string
}

// Reactive state
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const downloading = ref(false)
const template = ref<Template | null>(null)
const relatedTemplates = ref<Template[]>([])
const currentPreviewImage = ref('')
const isFavorite = ref(false)

// Template features
const templateFeatures = ref<Feature[]>([
  {
    title: 'Responsive Design',
    description: 'Fully responsive layout that works on all devices and screen sizes.',
    icon: 'heroicons:device-phone-mobile'
  },
  {
    title: 'Modern Components',
    description: 'Pre-built components following the latest design trends and best practices.',
    icon: 'heroicons:squares-plus'
  },
  {
    title: 'Easy Customization',
    description: 'Well-organized code structure for easy customization and modification.',
    icon: 'heroicons:wrench-screwdriver'
  },
  {
    title: 'Cross-browser Support',
    description: 'Compatible with all modern browsers including Chrome, Firefox, Safari, and Edge.',
    icon: 'heroicons:globe-alt'
  },
  {
    title: 'Documentation',
    description: 'Comprehensive documentation to help you get started quickly.',
    icon: 'heroicons:document-text'
  },
  {
    title: 'Free Updates',
    description: 'Receive free updates and improvements for the lifetime of the template.',
    icon: 'heroicons:arrow-path'
  }
])

// Computed properties
const allPreviewImages = computed(() => {
  if (!template.value) return []
  return [template.value.thumbnail, ...template.value.previewImages]
})

// Methods
const loadTemplate = async () => {
  try {
    loading.value = true
    const templateId = route.params.id as string
    
    // Simulate API call - replace with actual DataAdapter call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock template data
    template.value = {
      id: templateId,
      name: 'Professional Business Template',
      description: 'A modern, professional business template perfect for corporate websites, agencies, and startups. Features a clean design with powerful components.',
      price: 89,
      isFree: false,
      isPublic: true,
      thumbnail: `/api/placeholder/800/600?text=Template+${templateId}`,
      previewImages: [
        `/api/placeholder/800/600?text=Preview+1`,
        `/api/placeholder/800/600?text=Preview+2`,
        `/api/placeholder/800/600?text=Preview+3`,
        `/api/placeholder/800/600?text=Preview+4`
      ],
      author: {
        id: 'author-1',
        name: 'Design Studio Pro',
        avatar: '/api/placeholder/40/40?text=DS'
      },
      category: 'business',
      tags: ['business', 'corporate', 'modern', 'responsive', 'professional'],
      downloads: 1247,
      rating: 4.8,
      reviews: 89,
      pageCount: 8,
      componentCount: 32,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    currentPreviewImage.value = template.value.thumbnail
    
    // Load related templates
    loadRelatedTemplates()
  } catch (error) {
    console.error('Error loading template:', error)
    template.value = null
  } finally {
    loading.value = false
  }
}

const loadRelatedTemplates = () => {
  // Mock related templates
  relatedTemplates.value = [
    {
      id: 'related-1',
      name: 'Corporate Landing Page',
      description: 'Professional landing page template',
      price: 49,
      isFree: false,
      isPublic: true,
      thumbnail: '/api/placeholder/400/300?text=Related+1',
      previewImages: [],
      author: { id: '1', name: 'Creator', avatar: '/api/placeholder/40/40' },
      category: 'business',
      tags: ['business', 'landing'],
      downloads: 856,
      rating: 4.6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'related-2',
      name: 'Agency Portfolio',
      description: 'Creative agency portfolio template',
      price: 0,
      isFree: true,
      isPublic: true,
      thumbnail: '/api/placeholder/400/300?text=Related+2',
      previewImages: [],
      author: { id: '2', name: 'Designer', avatar: '/api/placeholder/40/40' },
      category: 'business',
      tags: ['business', 'portfolio'],
      downloads: 1203,
      rating: 4.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'related-3',
      name: 'Startup Website',
      description: 'Modern startup website template',
      price: 79,
      isFree: false,
      isPublic: true,
      thumbnail: '/api/placeholder/400/300?text=Related+3',
      previewImages: [],
      author: { id: '3', name: 'Studio', avatar: '/api/placeholder/40/40' },
      category: 'business',
      tags: ['business', 'startup'],
      downloads: 642,
      rating: 4.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

const downloadTemplate = async () => {
  if (!template.value) return
  
  try {
    downloading.value = true
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real implementation, this would handle payment for paid templates
    // and then provide the download link
    
    console.log('Template downloaded:', template.value.id)
    
    // Show success message or redirect to download
    alert('Template downloaded successfully!')
  } catch (error) {
    console.error('Error downloading template:', error)
    alert('Error downloading template. Please try again.')
  } finally {
    downloading.value = false
  }
}

const previewTemplate = () => {
  if (!template.value) return
  // Open preview in new window/tab
  window.open(`/preview/${template.value.id}`, '_blank')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Implement favorite functionality
  console.log('Toggle favorite:', template.value?.id, isFavorite.value)
}

const navigateToTemplate = (template: Template) => {
  router.push(`/marketplace/template/${template.id}`)
}

const toggleTemplateFavorite = (template: Template) => {
  console.log('Toggle favorite for template:', template.id)
}

const previewRelatedTemplate = (template: Template) => {
  window.open(`/preview/${template.id}`, '_blank')
}

// Utility functions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
  return `${Math.ceil(diffDays / 365)} years ago`
}

// Lifecycle
onMounted(() => {
  loadTemplate()
})

// SEO
useHead({
  title: computed(() => template.value ? `${template.value.name} - Template Marketplace` : 'Template - WebBuilder'),
  meta: computed(() => [
    { name: 'description', content: template.value?.description || 'Professional website template' }
  ])
})
</script>

<style scoped>
/* Custom animations */
.tw-animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
