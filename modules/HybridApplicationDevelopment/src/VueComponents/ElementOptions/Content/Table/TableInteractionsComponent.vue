<template>
    <div>
        <div>
            Row Selection
        <q-option-group 
        dense inline 
        v-model="rowSelectionModel" 
        :options="rowSelectionOptions" 
        @update:model-value="(val) => emits('updateElement', [{key: 'properties.selection', value:val}])">
        </q-option-group>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ITableViewConfiguration } from 'alphaviewlibrary/src/Data/Table/TableViewConfiguration';
import { ref } from 'vue';


defineExpose({
    setElement
})


function setElement(view: ITableViewConfiguration) {
    rowSelectionModel.value = view.properties.selection ?? 'none'
}
const emits = defineEmits(['updateElement'])

const rowSelectionModel = ref('none')

const rowSelectionOptions = [
    {
        label: 'Single',
        value: 'single'
    },
    {
        label: 'Multiple',
        value: 'multiple'
    },
    {
        label: 'None',
        value: 'none'
    }
]
</script>
