<template>
    <q-drawer
    v-bind="view?.htmlattributes" 
    v-model="view.modelValue"
    :side="view.properties?.side"
    :overlay="view.properties?.overlay"
    :mini="true"
    ref="viewRef" 
    :style="view.style">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid"
        >
        </BaseViewTreeRenderer>
    </q-drawer>
</template>


<script setup lang="ts">

import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

import { onMounted, onUnmounted, ref } from 'vue';
import { useViewConfiguration } from 'alphautils';

import { DrawerViewElement } from './Drawer/DrawerViewElement.ts';

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

const { view , children } = useViewConfiguration(props.contextid, props.viewId) as { view: IMenuV, children: Array<ViewElement> };

const viewElement = new DrawerViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>