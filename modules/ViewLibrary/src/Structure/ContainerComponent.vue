<template>
    <div v-bind="view?.htmlattributes" ref="viewRef" :style="view.style">
        <BaseViewTreeRenderer 
        v-for="component in children" :key="component"
        :contextid="contextid"
        :view="component">
        </BaseViewTreeRenderer>
    </div>
</template>

<script setup lang='ts'>
import {  ViewElement } from 'alphautils';
import { useViewConfiguration } from 'alphautils';
import { onMounted, ref, onUnmounted} from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    viewId: {
        type: Number,
        required: true
    }
})

const { view, children} = useViewConfiguration(props.contextid, props.viewId)
const viewElement = new ViewElement(view);
const viewRef = ref(null)
onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})
onUnmounted(() => {
    viewElement.unbind()
})
</script>