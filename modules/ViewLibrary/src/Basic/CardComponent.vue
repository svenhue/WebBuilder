<template>
    <UCard
    v-bind="view?.htmlattributes" 
    ref="viewRef" 
    :style="viewElement.ResolverObjectProperty(view.style)">
        <BaseViewTreeRenderer v-for="child in children" :key="child.id"
        
        :view="child"
        :contextid="contextid">
        </BaseViewTreeRenderer> 
    </UCard>

</template>

<script setup lang="ts">
import {  ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
const props = defineProps({
    viewId:{
        type: Number,
        required: false
    },
    contextid:{
        type: Number,
        required: false
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