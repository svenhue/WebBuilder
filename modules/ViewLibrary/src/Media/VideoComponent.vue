<template>
    <div>
        todo!
    </div>
</template>

<script setup lang="ts">

import { ViewElement } from 'alphautils';
import { onMounted, onUnmounted, ref } from 'vue';
import { useViewConfiguration } from 'alphautils';




const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid: {
        type: Number,
        required: true,
    }
})

const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);

const { view } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>