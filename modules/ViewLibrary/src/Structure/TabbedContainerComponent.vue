<template>
    <div v-bind="view?.htmlattributes" :style="viewElement.ResolverObjectProperty(view.style)" ref="viewRef">
       <UTabs :items="items" variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
  


  </UTabs>
    </div>
</template>

<script setup lang="ts">
import { TabbedContainerViewModel } from './TabbedContainer/TabbedContainerViewModel';
import { onMounted, onUnmounted, ref } from 'vue';
import { ViewElement, useViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
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
//todo
const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view)

const viewmodel = new TabbedContainerViewModel(viewElement.GetConfiguration())

onMounted(() => {
    viewElement.bind(props.contextid);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>