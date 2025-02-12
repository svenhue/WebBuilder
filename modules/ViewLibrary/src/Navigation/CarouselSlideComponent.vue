<template>
    <q-carousel-slide  v-bind="view?.htmlattributes" ref="viewRef" :style="view.style">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid"
        >
        </BaseViewTreeRenderer>
    </q-carousel-slide>
</template>

<script setup lang="ts">

import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

import { onMounted, onUnmounted, ref } from 'vue';
import { useViewConfiguration } from 'alphautils';
import { ViewElement } from 'alphautils';

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