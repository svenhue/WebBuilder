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
import { ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onUnmounted } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid: {
        type: Number,
        required: true,
    },
})

const viewRef = ref<HTMLElement>();

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>