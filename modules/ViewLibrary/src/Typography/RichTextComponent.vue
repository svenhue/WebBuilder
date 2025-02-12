<template>
        <div v-bind="props.view.htmlattributes">
          
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