<template>
    <UModal
    title="Delete Page" description="Delete a Page"
    :model-value="view?.properties?.isActive"
    dense
    :class="view?.class"
    :label="view?.content?.label ?? 'Button'"
    ref="viewRef"
    :flat="view?.properties?.flat ?? false"
    :style="viewElement.ResolverObjectProperty(view.style)"
    v-bind="view?.htmlattributes"
    >
    <template #content>
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid"
        >
        </BaseViewTreeRenderer>
    </template>
    </UModal>
</template>

<script setup lang='ts'>
import { useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount, MaybeRefOrGetter } from 'vue';

import { IViewConfiguration } from 'alphautils';
import  BaseViewTreeRenderer  from '../Renderer/BaseViewTreeRenderer.vue';
import { DialogViewElement } from './Dialog/DialogViewElement';
const props = defineProps({
    viewId: {
        type: Number,
        required: false,
    },
    contextid: {
        type: Number,
        required: false,
    }
})
const viewRef = ref(null);
const {view, children } = useViewConfiguration(props.contextid, props.viewId) as MaybeRefOrGetter<[ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>
    
    
const viewElement = new DialogViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})

</script>
