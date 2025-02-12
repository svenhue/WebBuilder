<template>
    <q-layout 
    v-bind="view.htmlattributes"
    :style="viewElement.ResolverObjectProperty(view.style)"
    ref="viewRef">
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :contextid="contextid"
        :view="child">

        </BaseViewTreeRenderer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>


<script setup lang="ts">
import { ViewConfiguration, ViewElement, useViewConfiguration,  } from 'alphautils';
import { IViewConfiguration } from 'alphautils';
import { MaybeRefOrGetter, ref, onMounted, onBeforeUnmount} from 'vue'
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
const {view, children} = useViewConfiguration(props.contextid, props.viewId) as MaybeRefOrGetter<[ MaybeRefOrGetter<ViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>
const viewElement = new ViewElement(view)


onMounted(() => {
    viewElement.bind(props.contextid, viewRef)
})

onBeforeUnmount(() => {
    viewElement.unbind()
})

</script>
