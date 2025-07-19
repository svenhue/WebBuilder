<template>
        <div
    v-bind="view.htmlattributes"
    :style="view.style"
    ref="viewRef">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :contextid="contextid"
        :view="child">

        </BaseViewTreeRenderer>

        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import { ViewConfiguration, ViewElement, useViewConfiguration,  } from 'alphautils';
import { IViewConfiguration } from 'alphautils';
import { MaybeRefOrGetter, ref, onMounted, onUnmounted} from 'vue'
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';


const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    viewId: {
        type: Number,
        required: true
    }
})
const viewRef = ref<InstanceType<typeof ViewElement>>(null)
const {view, children} = useViewConfiguration(props.contextid, props.viewId) as {view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<ViewConfiguration>>}
const viewElement = new ViewElement(view)

onMounted(() => {
    viewElement.bind(props.contextid, viewRef)
})

onUnmounted(() => {
    viewElement.unbind()
})



</script>
