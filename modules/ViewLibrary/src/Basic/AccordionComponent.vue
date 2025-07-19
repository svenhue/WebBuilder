<template>
        <UAccordion dense v-bind="view?.htmlattributes" :style="viewElement.ResolverObjectProperty(view.style)" ref="viewRef">
           
        </UAccordion>
</template>


<script setup lang="ts">
import { ViewElement, useViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    viewId:{
        type: Number,
        required: true
    },
    contextid:{
        type: Number,
        required: true
    }
})

const {view, children} = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind();
})
onBeforeUnmount(() => {
    viewElement.unbind()
})

</script>