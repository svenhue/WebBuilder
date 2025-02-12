<template>
    <div>
      
    </div>
</template>

<script setup lang="ts">


/*
import { reactive } from 'vue'
import { DataSources } from 'alphautils'
import { FormViewElement } from './FormViewElement.ts'
import { useModellingStore } from 'alphautils';
const emits = defineEmits(['updateElement'])



const focussedView =  JSON.parse(JSON.stringify(useModellingStore().getFirstFocussedElement(useModellingStore().currentcontext).value))
const options = reactive(focussedView) as FormViewElement;

function setValues(){
    if(options?.datasource?.sourceType == undefined){
        options.datasource = {
            sourceType: DataSources.default

        }
    }
}
 <div>
        <q-item>
            <q-item-section>
                <q-item-label>Datesource</q-item-label>
            </q-item-section>
            <q-item-section>
            <q-select
            @update:model-value="(v) => emits('updateElement', [{key: 'datasource', value: v}])"
            v-model="options?.datasource?.sourceType"
            :options="Object.values(DataSources)">

            </q-select>
        </q-item-section>
        </q-item>
       </div>
       <div>
            
       </div>
setValues();
*/


</script>