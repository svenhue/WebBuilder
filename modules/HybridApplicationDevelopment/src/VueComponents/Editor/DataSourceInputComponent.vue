<template>
    <div>
        <q-input dense :modelValue="modelValueX" @update:modelValue="(v) => updateElement(v)" >
           
            <template v-slot:before>
                <div class="editor-input-label"> Data source </div>

                <q-select
                ref="dataSourceRef"
               
                @update:model-value="(val) => updateDataConfig(val)"
                dense
                :options="options"
                :multiple="false"
                v-model="selectedSource">
                  
                    </q-select>
            </template>

            <template v-slot:after v-if="selectedSource == DataSources['Use Javascript'] || selectedSource == DataSources['Use Array'] || selectedSource == DataSources['Demo Data']">
                        <q-icon name="open_in_new" @click="openEditor()">

                        </q-icon>
            </template>
        </q-input>
     
        <div :style="{
            position: 'relative'
        }">
        <Teleport  :to="'#XXX'" v-if="showEditor == true && (selectedSource == DataSources['Use Javascript'] || selectedSource == DataSources['Use Array'])">
            <JSCodeEditorComponent 
            :style="codeEditorStyle" 
            :contextid="contextid" 
            :value="model" 
            @updateValue="(v) =>updateElement(v)" 
            @close="showEditor = false"/>
        </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataSources, IViewDataConfiguration } from 'alphautils';
import {  computed, ref } from 'vue';
import { JSCodeEditorComponent } from 'alphaviewlibrary';
import { ValueResolver } from 'alphautils';
import { BaseServiceProvider } from 'alphautils';
import { IExecutionContextProvider } from 'alphautils';

//todo completion providers fpr datasources jscodeeditor
const props = defineProps({
    initialDataConfig: {
        type: Object as () => IViewDataConfiguration,
        required: true
    },
    contextid: {
        type: Number,
        required: false
    }
})
const emits = defineEmits(['updateValue', 'updateDataConfig'])
const {service} = BaseServiceProvider.ServiceWithAppContext<IExecutionContextProvider>("CodeContextProvider", props.contextid)


const options = Object.values(DataSources)
const selectedSource = ref<string>('')
const showEditor = ref(false)
const dataSourceRef = ref(null)

const dataConfig = ref<IViewDataConfiguration>(props.initialDataConfig)

const model = ref();


function updateElement(v){
    setModel(v)
    emits('updateValue', model.value)
}



const modelValueX = computed(() => {
    return ValueResolver(service, props.contextid, model.value)?.value
})

function setModel(v: string) {
    switch(selectedSource.value){
        case DataSources['Use Javascript']:
            model.value = v
            break;
        case DataSources['Use Array']:
            model.value = JSON.parse(v)
            break;
        case DataSources['Demo Data']:
            model.value = v
            break;
        default:
            model.value = v
    }
}
function updateDataConfig(dataSource: DataSources){
    if(dataSource == undefined){
        throw new Error("Data source is undefined")
    }
    dataConfig.value.datasource = dataSource
    emits('updateDataConfig', dataConfig.value)
}
const codeEditorStyle = computed(() => {
    const rect = dataSourceRef.value.$el.getBoundingClientRect()
    return {
        position: 'absolute',
        top: rect.top + 'px',
        left: rect.x - 400 + 'px',
        width: '400px',
        height: '200px',
        zIndex: 100
    }
})

function openEditor() {
    showEditor.value = true
}
</script>
