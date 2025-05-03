<template>
    <div style="height: 100%; width: 100%">
      <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
        <main style="height: 100%; width: 100%">
        <slot ></slot>
        </main>
    </div>
</template>


<script setup lang="ts">
import type { NavigationMenuItem,  } from '@nuxt/ui'

const items = [

]
</script>