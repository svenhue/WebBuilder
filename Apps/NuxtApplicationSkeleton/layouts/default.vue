<template>
    <div>
      <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
        <main>
        <slot ></slot>
        </main>
    </div>
</template>


<script setup lang="ts">
import type { NavigationMenuItem,  } from '@nuxt/ui'

const items = [

]
</script>