<template>
  <a>
    <slot />
  </a>
</template>
<style scoped>
a {
  padding: 2px 10px;
  margin-left: -10px;
}
a.active {
  background-color: #eee;
}
</style>
<script lang="ts" setup>
import { useAttrs, computed } from 'vue'
import { usePageContext } from './usePageContext'

const pageContext = usePageContext()
const { href } = useAttrs()

</script>
