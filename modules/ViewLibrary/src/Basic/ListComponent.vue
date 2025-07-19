<template>
    <UPageList
    dense  
    :class="view?.class"
    :style="viewElement.ResolverObjectProperty(view.style)" 
    ref="viewRef" 
    v-bind="view?.htmlattributes">
              <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :contextid="contextid"
        :view="child">
        </BaseViewTreeRenderer>
    </UPageList>
</template>

<script setup lang="ts">

import { ViewElement, useViewConfiguration } from "alphautils";

import { onMounted, ref, onBeforeUnmount } from "vue";
const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid: {
        type: Number,
        required: true,
    }
})
const viewRef = ref(null);
const{ view, children } = useViewConfiguration(props.contextid, props.viewId);
const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>