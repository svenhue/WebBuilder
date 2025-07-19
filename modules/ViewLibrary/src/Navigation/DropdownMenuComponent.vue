<template>
    <UDropdownMenu>
        <UButton>

        </UButton>
    </UDropdownMenu>

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

const { view , children } = useViewConfiguration(props.contextid, props.viewId) as { view: IMenuV, children: Array<ViewElement> };

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})


</script>