<template>
        <div v-bind="props.view.htmlattributes" :style="viewElement.ResolverObjectProperty(view.style)">
          
        </div>
</template>

<script setup lang="ts">
import { ViewElement } from 'alphautils';

const props = defineProps({
    view:{
        type: ViewElement,
        required: true
    }
})

</script>