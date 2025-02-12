<template>
    <div>
        
    </div>
</template>


<script setup lang="ts">
import { IActionConfiguration } from 'alphautils';

const props = defineProps({
    action: {
        type: Object as () => IActionConfiguration,
        required: true
    }
})


</script>