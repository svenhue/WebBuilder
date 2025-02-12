<template>
    <div>
     <div class="drawer-header">
            State
            <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
            @click="$emit('close')"></q-btn>

    </div>
    <TableComponent
    :contextid="contextid"
    :config="{
        contextid: contextid,
        id: 0,
        properties:{
            rowsPerPageOptions: [20]
        },
        content:{
            initialRows: variables,
            columns:
            [
                {
                    name: 'Name',
                    label: 'Name',
                    field: 'key',
                    type: 'text',
                    align: 'left',
                    useCellPopupEdit: true,
                    sortable: true,
                    format: (value) => value


                },
                {
                    name: 'Value',
                    label: 'Value',
                    align: 'left',
                    sortable: true,
                    useCellPopupEdit: true,
                    field: 'value',
                    type: 'text',
                    
                    format: value => ValueResolver(contextProvider, contextid, value)
                },
                {
                    name: 'ExpressionOrText',
                    label: 'Expression or Text',
                    align: 'left',
                    field: 'value',
                    useCellPopupEdit: true,
                    type: 'textOrExpression',
                    format: (value) => value

                }
            ]
        }
    }">

    </TableComponent>

   
</div>
</template>

<script setup lang="ts">
import { BaseServiceProvider,ValueResolver } from 'alphautils';
import { onBeforeMount, ref } from 'vue';
import { GlobalVariableDataProvider } from '../../utils/Application/GlobalsVariableProvider/GlobalVariableDataProvider';
import { IExecutionContextProvider } from 'alphautils';
import { TableComponent } from 'alphaviewlibrary'
const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})
defineEmits(['close'])

const variables = ref([

])
let contextProvider= undefined;
let variableService = undefined;


onBeforeMount(() => {
    variableService = BaseServiceProvider.ServiceWithContext<GlobalVariableDataProvider>('GlobalVariableDataProvider', props.contextid) as GlobalVariableDataProvider;
    const vars = variableService.GetVariables(props.contextid)
    variables.value = vars;

    const {service} = BaseServiceProvider.ServiceWithAppContext<IExecutionContextProvider>('ExecutionContextProvider', props.contextid)
    contextProvider = service;
})

</script>

<style lang = "scss" scoped>
.editor-variables{
    min-width:800px;
}
</style>

