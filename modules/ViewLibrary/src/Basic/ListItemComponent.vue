<template>
    <q-item tag="li" :class="view?.class"  dense v-bind="view.htmlattributes" ref="viewRef" :style="view.style" :clickable="view.properties?.clickable">
        
            <q-item-section textnode>
                {{ view?.content?.label }}
            </q-item-section>
            <q-item-section v-if="view?.properties?.sideImg != undefined" side>
                <q-img :src="view.properties?.sideIcon"></q-img>
            </q-item-section>
            <q-item-section v-else-if="view.properties?.sideIcon != undefined" side>
                <q-icon :name="view.properties?.sideIcon"></q-icon>
            </q-item-section>
            <BaseViewTreeRenderer
            v-for="child in children" :key="child.id"
            :view="child"
            :contextid="contextid">
            </BaseViewTreeRenderer>
    </q-item>
</template>

<script setup lang="ts">    
import { ViewElement, useViewConfiguration } from 'alphautils';
import { QItem } from 'quasar';
import { ref, onMounted, onUnmounted } from 'vue';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';

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

const viewRef = ref<InstanceType<typeof QItem>>(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);
const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextId, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>