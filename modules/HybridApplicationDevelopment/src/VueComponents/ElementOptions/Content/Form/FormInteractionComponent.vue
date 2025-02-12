<template>
    <div>
    
    
    </div>
</template>

<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';


const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

</script>