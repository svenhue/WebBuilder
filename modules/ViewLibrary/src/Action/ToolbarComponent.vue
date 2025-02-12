<template>
    <q-toolbar 
    :style="view.style"
    v-bind="view.htmlattributes"
    ref="viewRef">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :contextid="contextid"
        :view="child">
        </BaseViewTreeRenderer>
    </q-toolbar>
</template>

<script setup lang="ts">
import {  type IViewConfiguration, ViewConfiguration, ViewElement } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { useViewConfiguration } from 'alphautils';
import { onMounted, ref, MaybeRefOrGetter} from 'vue';
import { onUnmounted } from 'vue';

const { contextid, viewId }
    = defineProps({
        viewId: {
            type: Number,
            required: true
        },
        contextid: {
            type: Number,
            required: true
        }
})

const {view, children} = useViewConfiguration(contextid, viewId) as  {view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<ViewConfiguration>>} 

const viewElement = new ViewElement(view);
const viewRef = ref(null)

onMounted(() => {
    viewElement.bind();
})
onUnmounted(() => {
    viewElement.unbind();
})
</script>