<template>
    <UDropdownMenu v-bind="view.htmlattributes">
              <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :contextid="contextid"
        :view="child">
        </BaseViewTreeRenderer>
    </UDropdownMenu>
</template>

<script setup lang="ts">
import { useViewConfiguration, ViewElement } from 'alphautils';
import { IViewConfiguration } from 'alphautils';
import { MaybeRefOrGetter, onMounted, onUnmounted, ref } from 'vue';



const { contextid, viewId }
    = defineProps({
        viewId: {
            type: Number,
            required: true
        },
        contextid: {
            type: Number,
            required: true
        }
})

const {view, children} = useViewConfiguration(contextid, viewId) as  {view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<IViewConfiguration>>} 

const viewElement = new ViewElement(view);
const viewRef = ref(null)

onMounted(() => {
    viewElement.bind();
})
onUnmounted(() => {
    viewElement.unbind();
})
</script>