<template>
    <div>
        todo!
    </div>
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