<template>
    <UTable
    :style="viewElement.ResolverObjectProperty(viewConfig.style)"
    v-bind="viewConfig?.htmlattributes"
    :data="viewModel.GetRows().value"
    :rows="viewModel.GetRows().value"
    :rows-per-page-options="viewModel.GetRowsPerPageOptions().value"
    :row-key="viewModel.rowKey"
    :selection="viewModel.selection"
    :selected="viewModel.selected.value"
    ref="table"
    @row-click="(e, row) => viewModel.SelectRow(row)"
    :columns="viewModel.GetColumns().value">

    
    </UTable>
</template>

<script setup lang="ts">

import { TableViewConfiguration } from './Table/TableViewConfiguration';
import { ViewConfiguration, ValueResolver, BaseServiceProvider } from 'alphautils';
import { useViewConfiguration } from 'alphautils';
import { TableViewElement } from './Table/TableViewElement.ts';
import { TableViewModel } from './Table/TableViewModel.ts';
import {  MaybeRefOrGetter, onMounted, onUnmounted, ref } from 'vue';
import { ITableViewConfiguration } from './Table/TableViewConfiguration.ts';

const props = defineProps({
    contextid: {
        type: Number,
        required: false
    },
    viewId: {
        type: Number,
        required: false
    },
    config: {
        type: Object as () => ITableViewConfiguration,
        required: false
    }
})

let viewConfig: MaybeRefOrGetter<ITableViewConfiguration> = {}
if (props.config) {
    viewConfig = ref(props.config)
} else {
    const { view } = useViewConfiguration(props.contextid, props.viewId) as [ TableViewConfiguration, Array<ViewConfiguration> ]
        viewConfig = view
}

const viewModel = new TableViewModel(viewConfig);

const contextProvider = BaseServiceProvider.ServiceWithContext<IExecutionContextProvider>("ExecutionContextProvider", props.contextid);

const viewElement = new TableViewElement(viewConfig);

onMounted(() => {
    viewElement.bind()
})

onUnmounted(() => {
    viewElement.unbind()
})

</script>
