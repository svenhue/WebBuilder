<template>
    <q-expansion-item 
    :switch-toggle-side="view.properties?.switchToggleSide != undefined ? view.properties.switchToggleSide : false"
    :label="view.content.label"
    :caption="view.content.caption"
    expand-separator
    dense-toggle
    dense 
    v-bind="view.htmlattributes"
    :style="view?.style" 
    :model-value="view.modelValue" 
    @update:model-value="(val) => viewModel.PartialUpdate(view, {key: 'modelValue', value: val})">
        
            <BaseViewTreeRenderer
            v-for="child in children" :key="child.id"
            :view="child"
            :contextid="contextid">
            </BaseViewTreeRenderer>
 
    </q-expansion-item>

</template>


<script setup lang="ts">
import {  BaseViewModel, ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { QExpansionItem } from 'quasar';

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
const viewRef = ref<InstanceType<QExpansionItem>>(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);
const viewModel = new BaseViewModel(viewElement.GetConfiguration().contextid);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>