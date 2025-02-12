<template>
    
    <q-form 
    ref="viewRef"
    :style="view.style"
    v-bind="view.htmlattributes">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="props.contextid"
        >
        </BaseViewTreeRenderer>
    </q-form>
</template>

<script setup lang="ts">
import { useViewConfiguration } from 'alphautils';
import { FormViewElement } from './Form/FormViewElement';
import { FormViewModel } from './Form/FormViewModel';
import { MaybeRefOrGetter, onMounted, onUnmounted, ref } from 'vue';
import { IViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer  from '../Renderer/BaseViewTreeRenderer.vue';
import { toValue } from 'vue';


const props = defineProps({
    viewId: {
        type: Number,
        required: true
    },
    contextid: {
        type: Number,
        required: true
    }
})
const viewRef = ref(null)
const {view, children} = useViewConfiguration(props.contextid, props.viewId) as [ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]

const viewModel = new FormViewModel(toValue(view))
const viewElement = new FormViewElement(view, viewRef, viewModel);



onMounted(() => {
    viewElement.bind(props.contextid);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>
