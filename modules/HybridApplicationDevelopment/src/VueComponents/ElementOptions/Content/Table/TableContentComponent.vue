<template>
    <div>
        <DataSourceInputComponent
        @updateDataConfig="(data) => updateDataConfig(data)"
        @updateValue="(data) => updateRows(data)"
        :initial-data-config="currentElement.dataConfig" 
        :contextid="currentElement.contextid">
        </DataSourceInputComponent>   
        <q-separator></q-separator>
        <TableColumnsComponent
        @update-column-source="(val) => UpdateColumnSource(val)"
        @updateColumns="(val) => emits('updateElement', [{key: 'content.columns', value: val}])"
        ref="columnsEditor">
        </TableColumnsComponent>
        <q-separator></q-separator>
        <q-input :type="'number'" dense v-model="rowsPerPageOptinos"  @update:model-value="() => {
            emits('updateElement', [{
              key: 'properties.isactive',
              value: false
            }]),
            emits('updateElement', [{
              key: 'properties.rowsPerPageOptions',
              value: [parseInt(rowsPerPageOptinos)]
            }]);
            emits('updateElement', [{
              key: 'properties.isactive',
              value: true
            }])
          }
        ">

          <template v-slot:before>
              <div class="editor-input-label"> Rows per page </div>
          </template>

        </q-input>
    </div>
</template>


<script setup lang="ts">
//@ts-ignore
//@ts-nocheck
import { ITableViewConfiguration } from '../../../../../../ViewLibrary/src/Data/Table/TableViewConfiguration';
import DataSourceInputComponent from '../../../Editor/DataSourceInputComponent.vue'
import { DataSources } from 'alphautils';
import TableColumnsComponent from './TableColumnsComponent.vue';
import { ref, watch } from 'vue';

const props = defineProps({
    currentElement: {
        type: Object as () => ITableViewConfiguration,
        required: true
    }
})
const columnsEditor = ref<typeof TableColumnsComponent>(null)
const rowsPerPageOptinos = ref()
watch(props.currentElement, (newVal) => {
  
  if(newVal.content?.columns != undefined){
    columnsEditor.value?.setColumns(newVal.content.columns)
  }
  if(newVal.dataConfig.columndatasource != undefined){
    columnsEditor.value?.setSource(newVal.dataConfig.columndatasource)
  }
  if(newVal.properties.rowsPerPageOptions != undefined){
    rowsPerPageOptinos.value = newVal.properties.rowsPerPageOptions[0]
  }
    
})

const emits = defineEmits(['updateElement'])
function updateRows(rows: Array<object>) {
    console.log(rows)
    if(!Array.isArray(rows)){
        //log error
        return;
    }
    
    emits('updateElement', [{key: 'content.initialRows', value: rows}])
}
function updateDataConfig(dataConfig: object) {
    console.log(dataConfig)
    // use demo rows
    if(dataConfig.datasource == DataSources['Demo Data']){
        emits('updateElement', [{key: 'content.initialRows', value: demoRows}])
    }else{
        emits('updateElement', [{key: 'content.initialRows', value: []}])
    
    }
}
function UpdateColumnSource(val){
    emits('updateElement', [{key: 'dataConfig.columndatasource', value: val}])
    emits('updateElement', [{key: 'content.columns', value: []}])
}
const demoRows = 
[
              {
                "id": 1,
                "firstName": "Alex",
                "lastName": "Meier",
                "email": ""
              },
              {
                "id": 2,
                "firstName": "Falk",
                "lastName": "Hüning",
                "email": ""
              },
              {
                "id": 3,
                "firstName": "Max",
                "lastName": "Mustermann",
                "email": ""
              },
              {
                "id": 4,
                "firstName": "Alexander",
                "lastName": "Meier",
                "email": ""
              },
              {
                "id": 5,
                "firstName": "Jane",
                "lastName": "Doe",
                "email": ""
              },
              {
                "id": 6,
                "firstName": "John",
                "lastName": "Smith",
                "email": ""
              },
              {
                "id": 7,
                "firstName": "Sascha",
                "lastName": "Rott",
                "email": ""
              }
            ]
</script>