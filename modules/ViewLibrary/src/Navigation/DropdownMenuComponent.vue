<template>
    
    <QuasarButtonComponent 
    v-if="view.properties?.isSubMenu != true"
    v-bind="view.htmlattributes"
    dense 
    :label="view.content.label">
        <q-menu 
        dense 
        :model-value="view?.modelValue ?? false"
        v-bind="view?.htmlattributes" 
        ref="viewRef" 
        :style="view.style" 
        :no-parent-event="view.properties?.noParentElement" 
        :target="view?.properties?.target"
        :auto-close="view.properties?.autoClose"
        :anchor="view.properties?.anchor"
        :self="view.properties?.self">
            <q-list dense>
                <BaseViewTreeRenderer dense
                v-for="child in children" :key="child.id"
                :view="child"
                :contextid="contextid"
                >
                </BaseViewTreeRenderer>
        
            </q-list>
        </q-menu>
    </QuasarButtonComponent>
    <q-menu 
    v-else
        dense 
        :model-value="view?.modelValue ?? true"
        v-bind="view?.htmlattributes" 
        ref="viewRef" 
        :style="view.style" 
        :no-parent-event="view.properties?.noParentElement" 
        :target="view?.properties?.target"
        :auto-close="view.properties?.autoClose"
        :anchor="view.properties?.anchor"
        :self="view.properties?.self">
            <q-list dense>
                <BaseViewTreeRenderer dense
                v-for="child in children" :key="child.id"
                :view="child"
                :contextid="contextid"
                >
                </BaseViewTreeRenderer>
        
            </q-list>
        </q-menu>
</template>

<script setup lang="ts">
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

import { onMounted, onUnmounted, ref } from 'vue';
import { useViewConfiguration } from 'alphautils';
import { ViewElement } from 'alphautils';
import QuasarButtonComponent from '../quasar/QuasarButtonComponent';

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
const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);

const { view , children } = useViewConfiguration(props.contextid, props.viewId) as { view: IMenuV, children: Array<ViewElement> };

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})


</script>