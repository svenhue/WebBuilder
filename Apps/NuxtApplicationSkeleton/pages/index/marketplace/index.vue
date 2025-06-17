<template>
  <div class="tw-min-h-screen tw-bg-dark-page">
    <!-- Hero Section -->
    <section class="tw-relative tw-bg-gradient-to-br tw-from-primary-dark tw-via-dark tw-to-akzent tw-py-20 tw-px-6">
      <div class="tw-max-w-7xl tw-mx-auto tw-text-center">
        <h1 class="tw-text-5xl tw-font-bold tw-text-fontwhite tw-mb-6">
          Build Faster with Premium Templates
        </h1>
        <p class="tw-text-xl tw-text-gray tw-mb-8 tw-max-w-3xl tw-mx-auto">
          Discover professionally designed templates for every industry. From startups to enterprises, 
          find the perfect foundation for your next project.
        </p>
        <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center tw-items-center">
          <div class="tw-relative tw-w-full sm:tw-w-96">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search templates..."
              class="tw-w-full tw-px-6 tw-py-4 tw-bg-brightgrey tw-text-fontwhite tw-rounded-lg tw-border tw-border-darkgrey focus:tw-border-primary focus:tw-outline-none"
              @input="handleSearch"
            />
            <Icon name="heroicons:magnifying-glass" class="tw-absolute tw-right-4 tw-top-4 tw-text-gray tw-w-6 tw-h-6" />
          </div>
          <button class="tw-px-8 tw-py-4 tw-bg-primary tw-text-fontwhite tw-rounded-lg tw-font-semibold hover:tw-bg-primary/90 tw-transition-colors">
            Browse All Templates
          </button>
        </div>
      </div>
    </section>

    <!-- Category Navigation -->
    <section class="tw-py-12 tw-px-6 tw-bg-dark">
      <div class="tw-max-w-7xl tw-mx-auto">
        <div class="tw-flex tw-flex-wrap tw-gap-4 tw-justify-center">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            :class="[
              'tw-px-6 tw-py-3 tw-rounded-full tw-font-medium tw-transition-all tw-duration-200',
              selectedCategory?.id === category.id
                ? 'tw-bg-primary tw-text-fontwhite tw-shadow-lg'
                : 'tw-bg-brightgrey tw-text-gray hover:tw-bg-darkgrey hover:tw-text-fontwhite'
            ]"
          >
            <Icon :name="category.icon" class="tw-w-5 tw-h-5 tw-inline tw-mr-2" />
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Templates -->
    <section class="tw-py-16 tw-px-6">
      <div class="tw-max-w-7xl tw-mx-auto">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-12">
          <div>
            <h2 class="tw-text-3xl tw-font-bold tw-text-fontwhite tw-mb-2">
              {{ selectedCategory ? `${selectedCategory.name} Templates` : 'Featured Templates' }}
            </h2>
            <p class="tw-text-gray">
              {{ selectedCategory ? selectedCategory.description : 'Handpicked templates from our community' }}
            </p>
          </div>
          <div class="tw-flex tw-gap-2">
            <button
              v-for="view in viewModes"
              :key="view.mode"
              @click="currentViewMode = view.mode"
              :class="[
                'tw-p-3 tw-rounded-lg tw-transition-colors',
                currentViewMode === view.mode
                  ? 'tw-bg-primary tw-text-fontwhite'
                  : 'tw-bg-brightgrey tw-text-gray hover:tw-bg-darkgrey'
              ]"
            >
              <Icon :name="view.icon" class="tw-w-5 tw-h-5" />
            </button>
          </div>
        </div>

        <!-- Templates Grid -->
        <div v-if="loading" class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
          <div v-for="n in 8" :key="n" class="tw-animate-pulse">
            <div class="tw-bg-brightgrey tw-rounded-xl tw-h-64 tw-mb-4"></div>
            <div class="tw-bg-brightgrey tw-rounded tw-h-4 tw-mb-2"></div>
            <div class="tw-bg-brightgrey tw-rounded tw-h-4 tw-w-3/4"></div>
          </div>
        </div>

        <div v-else :class="gridClasses">
          <TemplateCard
            v-for="template in filteredTemplates"
            :key="template.id"
            :template="template"
            :view-mode="currentViewMode"
            @click="navigateToTemplate(template)"
            @favorite="toggleFavorite(template)"
            @preview="previewTemplate(template)"
          />
        </div>

        <!-- Load More -->
        <div v-if="hasMore && !loading" class="tw-text-center tw-mt-12">
          <button
            @click="loadMore"
            class="tw-px-8 tw-py-4 tw-bg-brightgrey tw-text-fontwhite tw-rounded-lg tw-font-medium hover:tw-bg-darkgrey tw-transition-colors"
          >
            Load More Templates
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="tw-py-16 tw-px-6 tw-bg-dark">
      <div class="tw-max-w-7xl tw-mx-auto">
        <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8 tw-text-center">
          <div v-for="stat in stats" :key="stat.label" class="tw-space-y-2">
            <div class="tw-text-3xl tw-font-bold tw-text-primary">{{ stat.value }}</div>
            <div class="tw-text-gray tw-text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="tw-py-20 tw-px-6 tw-bg-gradient-to-r tw-from-primary tw-to-akzent">
      <div class="tw-max-w-4xl tw-mx-auto tw-text-center">
        <h2 class="tw-text-4xl tw-font-bold tw-text-fontwhite tw-mb-6">
          Ready to Create Your Own Template?
        </h2>
        <p class="tw-text-xl tw-text-fontwhite/90 tw-mb-8">
          Join thousands of creators earning from their designs. Upload your template and start earning today.
        </p>
        <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
          <button class="tw-px-8 tw-py-4 tw-bg-fontwhite tw-text-primary tw-rounded-lg tw-font-semibold hover:tw-bg-gray-light tw-transition-colors">
            Upload Template
          </button>
          <button class="tw-px-8 tw-py-4 tw-border-2 tw-border-fontwhite tw-text-fontwhite tw-rounded-lg tw-font-semibold hover:tw-bg-fontwhite hover:tw-text-primary tw-transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
// Temporarily comment out DataAdapter imports until path is resolved
// import { DataAdapter } from '~/modules/Utils/src/Data/DataAdapters/DataAdapter'
// import { DataAdapterOptions } from '~/modules/Utils/src/Data/DataAdapters/DataAdapterOptions'

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
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  templateCount: number
}

// Reactive state
const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref<Category | null>(null)
const currentViewMode = ref<'grid' | 'list'>('grid')
const loading = ref(true)
const templates = ref<Template[]>([])
const hasMore = ref(true)
const currentPage = ref(1)

// Data adapter for templates - temporarily disabled
// const templateAdapter = new DataAdapter({
//   boType: { name: 'UITemplate' },
//   contextId: 1,
//   persistLocalStorage: true,
//   subscribe: true
// } as DataAdapterOptions)

// Categories data
const categories = ref<Category[]>([
  {
    id: 'all',
    name: 'All Templates',
    description: 'Browse all available templates',
    icon: 'heroicons:squares-2x2',
    templateCount: 0
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional business websites and landing pages',
    icon: 'heroicons:building-office',
    templateCount: 0
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online stores and product showcases',
    icon: 'heroicons:shopping-cart',
    templateCount: 0
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Creative portfolios and personal websites',
    icon: 'heroicons:photo',
    templateCount: 0
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Content-focused websites and magazines',
    icon: 'heroicons:document-text',
    templateCount: 0
  },
  {
    id: 'landing',
    name: 'Landing Pages',
    description: 'High-converting landing pages',
    icon: 'heroicons:rocket-launch',
    templateCount: 0
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Software as a Service platforms',
    icon: 'heroicons:cloud',
    templateCount: 0
  },
  {
    id: 'nonprofit',
    name: 'Non-Profit',
    description: 'Charity and organization websites',
    icon: 'heroicons:heart',
    templateCount: 0
  }
])

// View modes
const viewModes = [
  { mode: 'grid' as const, icon: 'heroicons:squares-2x2' },
  { mode: 'list' as const, icon: 'heroicons:list-bullet' }
]

// Stats
const stats = ref([
  { label: 'Templates', value: '2,500+' },
  { label: 'Downloads', value: '1M+' },
  { label: 'Creators', value: '15K+' },
  { label: 'Categories', value: '50+' }
])

// Computed properties
const filteredTemplates = computed(() => {
  let filtered = templates.value

  // Filter by category
  if (selectedCategory.value && selectedCategory.value.id !== 'all') {
    filtered = filtered.filter(template => 
      template.category === selectedCategory.value?.id ||
      template.tags.includes(selectedCategory.value?.id || '')
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const gridClasses = computed(() => {
  return currentViewMode.value === 'grid'
    ? 'tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6'
    : 'tw-space-y-4'
})

// Methods
const loadTemplates = async () => {
  try {
    loading.value = true
    // Temporarily use mock data until DataAdapter is properly configured
    // const result = await templateAdapter.GetAll()
    // if (Array.isArray(result)) {
    //   templates.value = result.map(template => ({
    //     id: template.id || template._id,
    //     name: template.name || 'Untitled Template',
    //     description: template.description || '',
    //     price: template.price || 0,
    //     isFree: !template.price || template.price === 0,
    //     isPublic: template.isPublic !== false,
    //     thumbnail: template.thumbnail || '/api/placeholder/400/300',
    //     previewImages: template.previewImages || [],
    //     author: template.author || { id: '1', name: 'Anonymous', avatar: '/api/placeholder/40/40' },
    //     category: template.categorys?.[0] || 'business',
    //     tags: template.categorys || [],
    //     downloads: template.downloads || Math.floor(Math.random() * 1000),
    //     rating: template.rating || (4 + Math.random()),
    //     createdAt: template.createdAt || new Date().toISOString(),
    //     updatedAt: template.updatedAt || new Date().toISOString()
    //   }))
    // }
    
    // Use mock data for development
    templates.value = generateMockTemplates()
  } catch (error) {
    console.error('Error loading templates:', error)
    // Fallback to mock data for development
    templates.value = generateMockTemplates()
  } finally {
    loading.value = false
  }
}

const generateMockTemplates = (): Template[] => {
  const mockTemplates: Template[] = []
  const categoryIds = categories.value.slice(1).map(c => c.id) // Exclude 'all'
  
  for (let i = 1; i <= 20; i++) {
    const category = categoryIds[Math.floor(Math.random() * categoryIds.length)]
    mockTemplates.push({
      id: `template-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${i}`,
      description: `A professional ${category} template with modern design and responsive layout.`,
      price: Math.random() > 0.3 ? Math.floor(Math.random() * 200) + 29 : 0,
      isFree: Math.random() > 0.7,
      isPublic: true,
      thumbnail: `/api/placeholder/400/300?text=Template+${i}`,
      previewImages: [
        `/api/placeholder/800/600?text=Preview+${i}+1`,
        `/api/placeholder/800/600?text=Preview+${i}+2`
      ],
      author: {
        id: `author-${Math.floor(Math.random() * 10) + 1}`,
        name: `Creator ${Math.floor(Math.random() * 100) + 1}`,
        avatar: `/api/placeholder/40/40?text=A${i}`
      },
      category,
      tags: [category, 'responsive', 'modern'],
      downloads: Math.floor(Math.random() * 5000),
      rating: 4 + Math.random(),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    })
  }
  
  return mockTemplates
}

const selectCategory = (category: Category) => {
  selectedCategory.value = category.id === 'all' ? null : category
  currentPage.value = 1
}

const handleSearch = () => {
  currentPage.value = 1
}

const loadMore = () => {
  currentPage.value++
  // In a real implementation, this would load more templates from the API
}

const navigateToTemplate = (template: Template) => {
  router.push(`/marketplace/template/${template.id}`)
}

const toggleFavorite = (template: Template) => {
  // Implement favorite functionality
  console.log('Toggle favorite for template:', template.id)
}

const previewTemplate = (template: Template) => {
  // Implement preview functionality
  console.log('Preview template:', template.id)
}

// Lifecycle
onMounted(() => {
  loadTemplates()
})

// SEO
useHead({
  title: 'Template Marketplace - WebBuilder',
  meta: [
    { name: 'description', content: 'Discover premium website templates for your next project. Professional designs for business, e-commerce, portfolios and more.' }
  ]
})
</script>

<style scoped>
/* Custom animations and transitions */
.tw-animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
