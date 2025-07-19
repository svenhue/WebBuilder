<template>


</template>


<script setup lang="ts">
import {  BaseViewModel, ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

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
const viewRef = ref(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);
const viewModel = new BaseViewModel(viewElement.GetConfiguration().contextid);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>