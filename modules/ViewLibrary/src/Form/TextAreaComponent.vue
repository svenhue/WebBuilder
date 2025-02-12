<template>
    <textarea 
    textnode
    :value="view.content?.text"
    @input="(val) => viewModel.PartialUpdate(view, {key:'content.text', value:val.target.value})"
    v-bind="view.htmlattributes"
    :style="view.style"
    >
        
    </textarea>
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
console.log(viewModel)
onMounted(() => {
    viewElement.bind()
})

onUnmounted(() => {
    viewElement.unbind()
})

</script>