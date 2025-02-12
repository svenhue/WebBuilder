<template>
    <div>
        <q-select dense 
        :multiple="false"
        
        :options='columnSourceOptions' 
        v-model="columnSourceModle" 
        @update:model-value='(val) => UpdateSource(val.value)'>

            <template v-slot:before>
                <div class="editor-input-label" > Column source</div>

            </template>
        </q-select>
        <div>
            Columns
            <q-btn dense icon='add' @click='AddColumn'></q-btn>
        </div>
        <q-list dense >
            
            <q-item v-show="showNewItem" dense>
                <q-item-section>
                    <q-input dense 
                    v-model="newColumnModel.field" 
                    @focusout="() => { UpdateColumns(), showNewItem = false}" 
                    @update:model-value="(v) => {newColumnModel.name = v, newColumnModel.label = v, newColumnModel.align = 'left'}">

                    </q-input>
                </q-item-section>
                <q-item-section side> 
                    <q-btn dense icon='edit' @click='editColumn(newColumnModel)'></q-btn>
                    <q-btn dense icon='delete' @click='deleteColumn(newColumnModel)'></q-btn>
                </q-item-section>
            </q-item>
            <q-item dense v-for='column in columnsModel' :key='column'>
             
                        <q-input dense v-model="column.field" @update:model-value="UpdateColumns">
                        </q-input>
          
                    <q-input dense v-model="column.position" @update:model-value="UpdateColumns" :style="{
                        width: '25px'
                    }">
                    </q-input>
            
                <q-item-section side> 
                    <q-btn dense icon='edit' @click='editColumn(column)'></q-btn>
                    
                </q-item-section>
                <q-item-section side>
                    <q-btn dense icon='delete' @click='deleteColumn(column)'></q-btn>
                </q-item-section>
            </q-item>
        </q-list>
       
        <edit-table-column-component
        @update-column="(val) => { AddColumnModel(val), showNewItem = false}"
        ref="editor">

        </edit-table-column-component>
    </div>
    
</template>

<script setup lang='ts'>
import { ITableColumn } from 'alphaviewlibrary';
import { reactive, ref } from 'vue';
import EditTableColumnComponent from './EditTableColumnComponent.vue';

defineExpose({
    setSource,
    setColumns
})
const emits = defineEmits(['updateColumns', 'updateColumnSource'])

const editor = ref<typeof EditTableColumnComponent>(null)

const showNewItem = ref(false)
const newColumnModel = reactive({
    label: '',
    field: '',
    name: ''
})

const columnsModel = ref([])
const columnSourceModle = ref('Manual')
const columnSourceOptions = [
    {
        'label': 'Demo Data',
        'value': 'Demo Data'
    },
    {
        'label': 'Manual',
        'value': 'Manual'
    },
    {
        'label': 'Auto',
        'value': 'Auto'
    }
]

const demoColumns = [
              {
                'label': 'ID',
                'field': 'id',
                'name': 'ID',
                'position': 0,
                'align': 'left',
                "sortable": true
              },
              {
                'label': 'First Name',
                'field': 'firstName',
                'name': 'First Name',
                'position': 1,
                'align': 'left',
                "sortable": true
              },
              {
                'label': 'Last Name',
                'field': 'lastName',
                'name': 'Last Name',
                'position': 2,
                'align': 'left',
                "sortable": true
              },
              {
                'label': 'Email',
                'field': 'email',
                'name': 'Email',
                'position': 3,
                'align': 'left',
                "sortable": true
              },
              {
                'label': 'Role',
                'field': 'role',
                'name': 'Role',
                'position': 4,
                'align': 'left',
                "sortable": true
              },
              {
                'label': 'Active',
                'field': 'active',
                'name': 'Active',
                'position': 5,
                'align': 'left',
                "sortable": true
              }
]
function UpdateSource(source: string){
    emits('updateColumnSource', source)
    switch(source){
        case 'Demo Data':
            columnsModel.value = JSON.parse(JSON.stringify(demoColumns))
            console.log(columnsModel.value)
            emits('updateColumns', columnsModel.value)
            break;
        case 'Manual':
        columnsModel.value = []
            break;
        case 'Auto':
        columnsModel.value = []
            break;
    }
   
    
}
function AddColumn(){
    
    ResetNewColumnModel()
    
    const maxPosition = columnsModel.value.reduce((max, column) => {
        return column.position > max ? column.position : max
    }, 0)
    newColumnModel.position = maxPosition + 1
    showNewItem.value = true;
}

function ResetNewColumnModel(){
    Object.entries(newColumnModel).forEach(([key]) => {
        newColumnModel[key] = ''
    })
}
function AddColumnModel(column: ITableColumn){
    const model = columnsModel.value.findIndex((c) => c.name == column.name)
    if(model == -1){
        columnsModel.value.push(column)
    }else{
        columnsModel.value[model] = column
    }
    console.log(columnsModel.value)
}

function UpdateColumns(){
    if(newColumnModel.field != '' && newColumnModel.field != undefined){
        if(columnsModel.value.findIndex(c => c.field == newColumnModel.field) == -1){
            columnsModel.value.push(JSON.parse(JSON.stringify(newColumnModel)))
        }
    }
    
    emits('updateColumns', columnsModel.value)
    ResetNewColumnModel()
}

function setSource(source: string){
    columnSourceModle.value = source
}

function setColumns(column: Array<ITableColumn>){
    columnsModel.value = column
}
function editColumn(column: ITableColumn){
    editor.value?.showEditor()
    editor.value?.setColumn(column)
}

function deleteColumn(column: ITableColumn){
    const index = columnsModel.value.indexOf(column)
    
    if(index == -1){
        throw new Error('Column not found')
    }
    
    columnsModel.value.splice(index, 1)
}


</script>