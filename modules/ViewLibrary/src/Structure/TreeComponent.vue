<template>
    <div ref="viewRef">
        <q-tree
        :no-selection-unset="view.properties?.noSelectionUnset"
        :default-expand-all="view.properties?.defaultExpandAll"
        :accordion="view.properties?.accordion"
        :no-transition="view.properties?.noTransition"
        :node-key="view.properties?.nodeKey"
        :label-key="view.properties?.labelKey"
        :children-key="view.properties?.childrenKey"
        :icon="view.properties?.icon"
        :filter="view.properties?.filter"

        :selected="viewModel.selected"
        :expanded="viewModel.expanded"
        :ticked="viewModel.ticket"
        :filter-method="viewModel.filter"
        v-bind="view.htmlattributes">

        

        </q-tree>
    </div>
</template>

<script setup lang='ts'>

import { onMounted, onUnmounted, ref } from 'vue';
import { TreeViewElement } from './Tree/TreeViewElement';
import { TreeViewModel } from './Tree/TreeViewModel';
import { useViewConfiguration } from 'alphautils';
const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid: {
        type: Number,
        required: true,
    },
})

const viewRef = ref<HTMLElement>();

const { config } = useViewConfiguration(props.viewId, props.contextid);

const view = new TreeViewElement(config);
const viewModel = new TreeViewModel(view);


onMounted(() => {
    view.bind(viewRef);
})

onUnmounted(() => {
    view.unbind();
})


</script>

<style scoped>

</style>