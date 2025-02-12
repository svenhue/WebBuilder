<template>
    <div v-bind="view?.htmlattributes" ref="viewRef" :style="view?.style">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid">
        </BaseViewTreeRenderer>
    </div>

</template>

<script setup lang="ts">
import {  ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onBeforeUnmount, ref } from 'vue';
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
const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);
const { view, children } = useViewConfiguration(props.contextid, props.viewId);
const viewElement = new ViewElement(view);
onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>