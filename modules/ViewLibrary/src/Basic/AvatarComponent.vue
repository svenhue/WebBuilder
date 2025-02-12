<template>
    <q-avatar
    :style="view?.style"
    v-bind="view?.htmlattributes"
    ref="viewRef"
    :icon="view?.properties?.icon ?? 'account_circle'" >

    </q-avatar>
</template>

<script setup lang="ts">
import {  ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onBeforeUnmount, ref } from 'vue';
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
const { view } = useViewConfiguration(props.contextid, props.viewId);
const viewElement = new ViewElement(view);
onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})

</script>