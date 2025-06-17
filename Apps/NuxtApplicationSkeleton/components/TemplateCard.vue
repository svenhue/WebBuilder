<template>
  <div
    :class="[
      'tw-group tw-cursor-pointer tw-transition-all tw-duration-300',
      viewMode === 'grid'
        ? 'tw-bg-brightgrey tw-rounded-xl tw-overflow-hidden hover:tw-shadow-2xl hover:tw-scale-105'
        : 'tw-bg-brightgrey tw-rounded-lg tw-p-4 tw-flex tw-gap-4 hover:tw-bg-darkgrey'
    ]"
    @click="$emit('click', template)"
  >
    <!-- Grid View -->
    <template v-if="viewMode === 'grid'">
      <!-- Template Image -->
      <div class="tw-relative tw-aspect-[4/3] tw-overflow-hidden">
        <img
          :src="template.thumbnail"
          :alt="template.name"
          class="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-300 group-hover:tw-scale-110"
          loading="lazy"
        />
        
        <!-- Overlay Actions -->
        <div class="tw-absolute tw-inset-0 tw-bg-black/60 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-flex tw-items-center tw-justify-center tw-gap-3">
          <button
            @click.stop="$emit('preview', template)"
            class="tw-p-3 tw-bg-fontwhite tw-text-primary tw-rounded-full tw-shadow-lg hover:tw-bg-gray-light tw-transition-colors"
            title="Preview Template"
          >
            <Icon name="heroicons:eye" class="tw-w-5 tw-h-5" />
          </button>
          <button
            @click.stop="$emit('favorite', template)"
            :class="[
              'tw-p-3 tw-rounded-full tw-shadow-lg tw-transition-colors',
              template.isFavorite
                ? 'tw-bg-red-500 tw-text-fontwhite hover:tw-bg-red-600'
                : 'tw-bg-fontwhite tw-text-primary hover:tw-bg-gray-light'
            ]"
            title="Add to Favorites"
          >
            <Icon name="heroicons:heart" :class="template.isFavorite ? 'tw-fill-current' : ''" class="tw-w-5 tw-h-5" />
          </button>
        </div>

        <!-- Price Badge -->
        <div class="tw-absolute tw-top-3 tw-right-3">
          <span
            :class="[
              'tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold tw-shadow-lg',
              template.isFree
                ? 'tw-bg-green tw-text-fontwhite'
                : 'tw-bg-primary tw-text-fontwhite'
            ]"
          >
            {{ template.isFree ? 'Free' : `$${template.price}` }}
          </span>
        </div>

        <!-- Category Badge -->
        <div class="tw-absolute tw-top-3 tw-left-3">
          <span class="tw-px-2 tw-py-1 tw-bg-black/70 tw-text-fontwhite tw-text-xs tw-rounded tw-capitalize">
            {{ template.category }}
          </span>
        </div>
      </div>

      <!-- Template Info -->
      <div class="tw-p-4">
        <div class="tw-flex tw-items-start tw-justify-between tw-mb-2">
          <h3 class="tw-font-semibold tw-text-fontwhite tw-text-lg tw-line-clamp-1 tw-flex-1">
            {{ template.name }}
          </h3>
        </div>
        
        <p class="tw-text-gray tw-text-sm tw-line-clamp-2 tw-mb-3">
          {{ template.description }}
        </p>

        <!-- Author & Stats -->
        <div class="tw-flex tw-items-center tw-justify-between tw-text-sm">
          <div class="tw-flex tw-items-center tw-gap-2">
            <img
              :src="template.author.avatar"
              :alt="template.author.name"
              class="tw-w-6 tw-h-6 tw-rounded-full"
            />
            <span class="tw-text-gray">{{ template.author.name }}</span>
          </div>
          
          <div class="tw-flex tw-items-center tw-gap-3 tw-text-gray">
            <div class="tw-flex tw-items-center tw-gap-1">
              <Icon name="heroicons:star" class="tw-w-4 tw-h-4 tw-text-yellow" />
              <span>{{ template.rating.toFixed(1) }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-gap-1">
              <Icon name="heroicons:arrow-down-tray" class="tw-w-4 tw-h-4" />
              <span>{{ formatNumber(template.downloads) }}</span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="tw-flex tw-flex-wrap tw-gap-1 tw-mt-3">
          <span
            v-for="tag in template.tags.slice(0, 3)"
            :key="tag"
            class="tw-px-2 tw-py-1 tw-bg-dark tw-text-gray tw-text-xs tw-rounded tw-capitalize"
          >
            {{ tag }}
          </span>
          <span
            v-if="template.tags.length > 3"
            class="tw-px-2 tw-py-1 tw-bg-dark tw-text-gray tw-text-xs tw-rounded"
          >
            +{{ template.tags.length - 3 }}
          </span>
        </div>
      </div>
    </template>

    <!-- List View -->
    <template v-else>
      <!-- Template Image -->
      <div class="tw-relative tw-w-32 tw-h-24 tw-flex-shrink-0 tw-rounded-lg tw-overflow-hidden">
        <img
          :src="template.thumbnail"
          :alt="template.name"
          class="tw-w-full tw-h-full tw-object-cover"
          loading="lazy"
        />
        
        <!-- Price Badge -->
        <div class="tw-absolute tw-top-2 tw-right-2">
          <span
            :class="[
              'tw-px-2 tw-py-1 tw-rounded tw-text-xs tw-font-semibold',
              template.isFree
                ? 'tw-bg-green tw-text-fontwhite'
                : 'tw-bg-primary tw-text-fontwhite'
            ]"
          >
            {{ template.isFree ? 'Free' : `$${template.price}` }}
          </span>
        </div>
      </div>

      <!-- Template Info -->
      <div class="tw-flex-1 tw-min-w-0">
        <div class="tw-flex tw-items-start tw-justify-between tw-mb-2">
          <div class="tw-flex-1 tw-min-w-0">
            <h3 class="tw-font-semibold tw-text-fontwhite tw-text-lg tw-truncate">
              {{ template.name }}
            </h3>
            <p class="tw-text-gray tw-text-sm tw-line-clamp-2">
              {{ template.description }}
            </p>
          </div>
          
          <div class="tw-flex tw-gap-2 tw-ml-4">
            <button
              @click.stop="$emit('preview', template)"
              class="tw-p-2 tw-bg-dark tw-text-gray tw-rounded hover:tw-bg-darkgrey hover:tw-text-fontwhite tw-transition-colors"
              title="Preview Template"
            >
              <Icon name="heroicons:eye" class="tw-w-4 tw-h-4" />
            </button>
            <button
              @click.stop="$emit('favorite', template)"
              :class="[
                'tw-p-2 tw-rounded tw-transition-colors',
                template.isFavorite
                  ? 'tw-bg-red-500 tw-text-fontwhite hover:tw-bg-red-600'
                  : 'tw-bg-dark tw-text-gray hover:tw-bg-darkgrey hover:tw-text-fontwhite'
              ]"
              title="Add to Favorites"
            >
              <Icon name="heroicons:heart" :class="template.isFavorite ? 'tw-fill-current' : ''" class="tw-w-4 tw-h-4" />
            </button>
          </div>
        </div>

        <!-- Author & Stats -->
        <div class="tw-flex tw-items-center tw-justify-between tw-text-sm tw-mt-3">
          <div class="tw-flex tw-items-center tw-gap-2">
            <img
              :src="template.author.avatar"
              :alt="template.author.name"
              class="tw-w-5 tw-h-5 tw-rounded-full"
            />
            <span class="tw-text-gray">{{ template.author.name }}</span>
            <span class="tw-text-gray tw-capitalize">• {{ template.category }}</span>
          </div>
          
          <div class="tw-flex tw-items-center tw-gap-3 tw-text-gray">
            <div class="tw-flex tw-items-center tw-gap-1">
              <Icon name="heroicons:star" class="tw-w-4 tw-h-4 tw-text-yellow" />
              <span>{{ template.rating.toFixed(1) }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-gap-1">
              <Icon name="heroicons:arrow-down-tray" class="tw-w-4 tw-h-4" />
              <span>{{ formatNumber(template.downloads) }}</span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="tw-flex tw-flex-wrap tw-gap-1 tw-mt-2">
          <span
            v-for="tag in template.tags.slice(0, 5)"
            :key="tag"
            class="tw-px-2 tw-py-1 tw-bg-dark tw-text-gray tw-text-xs tw-rounded tw-capitalize"
          >
            {{ tag }}
          </span>
          <span
            v-if="template.tags.length > 5"
            class="tw-px-2 tw-py-1 tw-bg-dark tw-text-gray tw-text-xs tw-rounded"
          >
            +{{ template.tags.length - 5 }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
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
  isFavorite?: boolean
}

interface Props {
  template: Template
  viewMode: 'grid' | 'list'
}

defineProps<Props>()

defineEmits<{
  click: [template: Template]
  favorite: [template: Template]
  preview: [template: Template]
}>()

// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.tw-line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tw-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
