<template>
    <QuasarButtonComponent
    class="daisy-btn"
    dense
    no-caps
    :align="view?.properties?.align"
    :class="view?.class"
    :label="t(view?.content ?? 'Button')"
    ref="viewRef"
    :icon="view?.iconName"
    :flat="view?.properties?.flat ?? false"
    :style="view.style"
    v-bind="view?.htmlattributes"
    :round="view?.appearence?.round ?? false"
    :unelevated="view?.appearence?.unelevated ?? false"
    >
    </QuasarButtonComponent> 
</template>
//todo use my btn
<script setup lang='ts'>
import { ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount, MaybeRefOrGetter } from 'vue';
import { QBtn } from 'quasar';
import { IViewConfiguration } from 'alphautils';
import  BaseViewTreeRenderer  from '../Renderer/BaseViewTreeRenderer.vue';
import { useI18n } from 'vue-i18n'
import QuasarButtonComponent from '../quasar/QuasarButtonComponent';
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
const { t } = useI18n();

const viewRef = ref<InstanceType<typeof QBtn>>(null);
const {view, children } = useViewConfiguration(props.contextid, props.viewId) as MaybeRefOrGetter<[ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>
const viewelement = new ViewElement<typeof QBtn>(view);


onMounted(() => {
    viewelement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewelement.unbind()
})
</script>
