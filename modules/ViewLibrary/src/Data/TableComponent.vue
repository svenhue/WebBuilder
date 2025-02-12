<template>
    <q-table
    :style="viewConfig?.style"
    v-bind="viewConfig?.htmlattributes"
    :rows="viewModel.GetRows().value"
    :rows-per-page-options="viewModel.GetRowsPerPageOptions().value"
    :row-key="viewModel.rowKey"
    :selection="viewModel.selection"
    :selected="viewModel.selected.value"
    ref="table"
    @row-click="(e, row) => viewModel.SelectRow(row)"
    :columns="viewModel.GetColumns().value">

        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td v-for="column in viewModel.GetColumns().value" 
                :props="props"
                :key="column.name">
                    {{ ValueResolver(contextProvider, contextid, props.row[column.field]) }}   
                    
                    <table-cell-popup-edit-component
                    :contextid="contextid"
                    v-if="column.useCellPopupEdit != undefined && column.useCellPopupEdit == true"
                    @update:model-value="(val) => props.row[column.field] = val"
                    :model-value="props.row[column.field]"
                    :title="column.label"
                    :type="column.type"
                    :auto-save="true"
                >
                    </table-cell-popup-edit-component>
                </q-td>
                
                
            </q-tr>
        </template>
    
    </q-table>
</template>

<script setup lang="ts">
import { QTable } from 'quasar';
import { TableViewConfiguration } from './Table/TableViewConfiguration';
import { ViewConfiguration, ValueResolver, BaseServiceProvider } from 'alphautils';
import { useViewConfiguration } from 'alphautils';
import { TableViewElement } from './Table/TableViewElement.ts';
import { TableViewModel } from './Table/TableViewModel.ts';
import {  MaybeRefOrGetter, onMounted, onUnmounted, ref } from 'vue';
import { ITableViewConfiguration } from './Table/TableViewConfiguration.ts';
import TableCellPopupEditComponent from './TableCellPopupEditComponent.vue';
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
