<template>
    <UHeader
    class="alpha-header"
    v-bind="view?.htmlattributes" 
    ref="viewRef" 
    :class="view?.class"
    :style="viewElement.ResolverObjectProperty(view.style)">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child"
        :view="child"
        :contextid="contextid">
        </BaseViewTreeRenderer>
    </UHeader>
</template>

<script setup lang="ts">
import { useViewConfiguration } from 'alphautils';
import { ViewElement } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { onMounted, onUnmounted, ref } from 'vue';

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

onUnmounted(() => {
    viewElement.unbind();
})



</script>
    