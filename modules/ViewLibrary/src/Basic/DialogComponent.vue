<template>
    <q-dialog
    :model-value="view?.modelValue ?? true"
    dense
    :class="view?.class"
    :label="view?.content?.label ?? 'Button'"
    ref="viewRef"
    :flat="view?.properties?.flat ?? false"
    :style="view.style"
    v-bind="view?.htmlattributes"
    >
        <BaseViewTreeRenderer
        v-for="child in children" :key="child.id"
        :view="child"
        :contextid="contextid"
        >
        </BaseViewTreeRenderer>
    </q-dialog>
</template>

<script setup lang='ts'>
import { useViewConfiguration } from 'alphautils';
import { ref, onMounted, onBeforeUnmount, MaybeRefOrGetter } from 'vue';
import { QBtn, QDialog } from 'quasar';
import { IViewConfiguration } from 'alphautils';
import  BaseViewTreeRenderer  from '../Renderer/BaseViewTreeRenderer.vue';
import { DialogViewElement } from './Dialog/DialogViewElement';
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
const viewRef = ref<InstanceType<typeof QBtn>>(null);
const {view, children } = useViewConfiguration(props.contextid, props.viewId) as MaybeRefOrGetter<[ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>
    
    
const viewelement = new DialogViewElement(view);

onMounted(() => {
    viewelement.bind(props.contextid, viewRef);
})

onBeforeUnmount(() => {
    viewelement.unbind()
})

</script>
