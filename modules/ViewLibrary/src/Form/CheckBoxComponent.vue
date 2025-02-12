<template>
    <q-checkbox 
    
    v-bind="view.htmlattributes" 
    :model-value="view?.modelValue ?? false"
    @update:model-value="(val) => viewModel.PartialUpdate(view, {key:'modelValue', value:val})"
    :checked-icon="view.properties?.checkedIcon"
    :unchecked-icon="view.properties?.uncheckedIcon"
    :name="view.properties?.name"
    textnode
    :label="view?.content?.label"
    :disable="view.properties?.disable ?? false"
    :size="view.properties?.size"
    :dense="view.properties?.dense"
    >
        
    </q-checkbox>
</template>

<script setup lang="ts">
import { BaseViewModel, ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onUnmounted } from 'vue';

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

const { view } = useViewConfiguration(props.contextid, props.viewId)
const viewElement = new ViewElement(view)
const viewModel = new BaseViewModel(props.contextid)

onMounted(() => {
    viewElement.bind()
})

onUnmounted(() => {
    viewElement.unbind()
})
</script>