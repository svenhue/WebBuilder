<template>
    <q-list :tag="view.properties?.ordered == true ? 'ol': 'ul' " dense  :style="view.style" ref="viewRef" v-bind="view?.htmlattributes">
        <ListItemComponent
        v-for="child in children" :key="child.id"
        :viewId="child.id"
        :contextid="contextid">

        </ListItemComponent>
    </q-list>
</template>

<script setup lang="ts">

import { ViewElement, useViewConfiguration } from "alphautils";
import  ListItemComponent  from "./ListItemComponent.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
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
const viewRef = ref<InstanceType<typeof ListItemComponent>>(null);
const{ view, children } = useViewConfiguration(props.contextid, props.viewId);
const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewElement.unbind()
})
</script>