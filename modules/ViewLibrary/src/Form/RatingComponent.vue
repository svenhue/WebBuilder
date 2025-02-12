<template>
    <q-rating
    v-bind="view?.htmlattributes"
    :icon="view?.properties?.icon"
    :name="view?.properties?.name"
    :icon-selected="view?.properties?.iconSelected"
    :icon-half="view?.properties?.iconHalf"
    :max="view?.properties?.max"
    :readonly="view?.properties?.readonly"
    :disable="view?.properties?.disable"
    @update:model-value="(val) => viewModel.PartialUpdate(view, {key:'modelValue', value:val})"
    :model-value="view?.modelValue ?? 0">

    </q-rating>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { BaseViewModel, ViewElement, useViewConfiguration } from 'alphautils';


const props = defineProps({
    viewId: {
        type: Number,
        required: true
    },
    contextid: {
        type: Number,
        required: true
    },
})

const { view } = useViewConfiguration(props.contextid, props.viewId)
const viewModel = new BaseViewModel(props.contextid)

const viewElement = new ViewElement(view)

onMounted(() => {
    viewElement.bind()
})

onUnmounted(() => {
    viewElement.unbind()
})
</script>