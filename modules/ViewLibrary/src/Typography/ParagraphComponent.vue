<template>
    <p textnode v-bind="view?.htmlattributes" :style="view.style" ref="viewRef"   v-html="t(view?.content?.text)">
       
    </p>
</template>


<script setup lang="ts">
import { ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n"

const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid:{
        type: Number,
        required: true
    }
})

const { t } = useI18n();
const viewRef = ref<HTMLElement>(null);

const { view } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>