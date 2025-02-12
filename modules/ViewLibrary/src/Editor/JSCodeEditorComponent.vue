<template>
    
        <div  class="code-editor" :style="style" ref="refEditor"
        >
            <q-btn dense icon='close' @click="() => { emit('close')}">

            </q-btn>
            <q-btn dense icon='check' @click="() => {updateValue(), emit('close')}">

            </q-btn>
        </div>
    

</template>


<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';
import { ICodeEditorService } from './ICodeEditorService';
import * as monaco from 'monaco-editor';
import { BaseServiceProvider } from 'alphautils';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';

const refEditor = ref<HTMLElement | null>(null);

const props = defineProps({
    isExpression: {
        type: Boolean,
        required: false,
        default: () => false
    },
    contextid: {
        type: Number,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    style:{
        type: Object,
        required: false
    },
    requestingComponent:{
        type: Object as () => IViewConfiguration,
    }
})
const emit = defineEmits(['updateValue', 'close'])
const service = BaseServiceProvider.ServiceWithContext<ICodeEditorService>("CodeEditorService", props.contextid)
let editor = null as monaco.editor.IStandaloneCodeEditor | null

onMounted(() => {  
    
    editor = service.OpenEditorForExpression(refEditor, props.contextid, props.value, undefined, props.requestingComponent)
})

onUnmounted(() => {
    service.dispose()
})

function updateValue() {
    const value = editor.getModel().getValue()
    emit('updateValue', value)
}

</script>

<style lang="scss">
.code-editor{
    min-height: 300px;
    .monaco-editor{
        min-height: 300px

    }
}


</style>