<template>
    <q-btn-dropdown v-bind="view?.htmlattributes" ref="viewRef" :style="view?.style">

        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid"
        >
        </BaseViewTreeRenderer>

    </q-btn-dropdown>
</template>

<script setup lang="ts">
import BaseViewTreeRenderer  from '../Renderer/BaseViewTreeRenderer.vue';
import { useViewConfiguration } from 'alphautils';
import { ViewElement } from 'alphautils';
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

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})


</script>