<template>

    <router-link
    textnode
    :to="view?.properties?.link != undefined ? view?.properties?.link : ''"
    v-bind="view?.htmlattributes"
    :style="view?.style"
      v-html="t(view?.content?.text)"
    ref="viewRef">
    
    
    </router-link>
</template>

<script setup lang="ts">
import {  IViewConfiguration, ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, ref, onUnmounted, defineProps, MaybeRefOrGetter } from 'vue';
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

const { t } = useI18n();
const viewRef = ref<HTMLElement | null>(null);

const { view } = useViewConfiguration(props.contextid, props.viewId) as { view: MaybeRefOrGetter<IViewConfiguration>};


const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(view, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})



</script>