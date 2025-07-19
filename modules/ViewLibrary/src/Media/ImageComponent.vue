<template>
    <UImage
    :alt="view?.content?.alt"
    v-bind="view.htmlattributes" 
    :style="viewElement.ResolverObjectProperty(view.style)" 
    :src="view?.properties?.src" >
    </UImage>
</template>

<script setup lang="ts">
import { useViewConfiguration } from 'alphautils';
import { ImageView } from './Image/ImageView.js';
import { onMounted, onUnmounted, ref } from 'vue';




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

const viewElement = new ImageView(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})



</script>