<template>
    <q-carousel  v-bind="view?.htmlattributes" ref="viewRef" :style="view.style">
        <CarouselSlideComponent
        v-for="child in children" :key="child.id"
        :viewId="child.id"
        :contextid="contextid">
        >
        </CarouselSlideComponent>
    </q-carousel>
</template>

<script setup lang="ts">
import CarouselSlideComponent from './CarouselSlideComponent.vue';

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