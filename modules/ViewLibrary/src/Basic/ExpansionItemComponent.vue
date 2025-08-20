<template>
    <UCollapsible class="flex flex-col">
        <UButton
            :label="getLabel()"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            />
        <template #content>
            <slot></slot>
        </template>
    </UCollapsible>
</template>


<script setup lang="ts">
import {  BaseViewModel, ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

const props = defineProps({
    viewId:{
        type: Number,
        required: false
    },
    contextid:{
        type: Number,
        required: false
    },
    label: {
        type: String,
        required: false
    }
})
const viewRef = ref(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

function getLabel() {
    return props.label || view?.content?.label;
}
onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>