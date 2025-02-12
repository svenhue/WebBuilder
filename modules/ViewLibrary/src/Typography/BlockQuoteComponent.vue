<template>
    <blockquote v-bind="view.htmlattributes" :style="view?.style" ref="viewRef" textnode   v-html="t(view?.content?.text)">
        
    </blockquote>
</template>


<script setup lang="ts">

import { ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, ref, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n"
const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid:{
        type: Number,
        required: true
    }
})
const {t } = useI18n();
const viewRef = ref<HTMLElement | null>(null);

const { view } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(view, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})
</script>
