<template>
    <div v-bind="view.htmlattributes" :style="view?.style" ref="viewRef">
        <router-link :to="view?.properties?.to != undefined ? view?.properties?.to : ''">

        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ViewElement, useViewConfiguration } from 'alphautils';
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