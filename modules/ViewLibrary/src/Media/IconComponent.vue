<template>
    <UIcon
    v-bind="view.htmlattributes"
    :style="viewElement.ResolverObjectProperty(view.style)"
    :name="view.properties.iconName">

    </UIcon>
</template>

<script setup lang="ts">
import { useViewConfiguration } from 'alphautils';
import { ViewElement } from 'alphautils';
import { onMounted, onUnmounted, ref } from 'vue';




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

const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);

const { view } = useViewConfiguration(props.contextid, props.viewId);

    const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>