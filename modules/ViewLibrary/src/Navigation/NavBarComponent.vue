<template>
    <q-toolbar v-bind="view?.htmlattributes" ref="viewRef" :style="view.style">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid">
        </BaseViewTreeRenderer>

    </q-toolbar>
</template>

<script setup lang="ts">
import { useViewConfiguration } from 'alphautils';
import { MaybeRefOrGetter, onMounted, onUnmounted, ref } from 'vue';
import { NavbarViewElement } from './Navbar/NavbarViewElement.js';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { IViewConfiguration } from 'alphautils';
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
const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);
const {view, children} = useViewConfiguration(props.contextid, props.viewId) as {view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<IViewConfiguration>>};


const viewElement = new NavbarViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})


</script>