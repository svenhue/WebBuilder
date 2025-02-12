<template>
    
    <div  class="jsoneditor1" ref="refEditorX"
    >
        <q-btn dense icon='close' @click="() => { emit('close')}">

        </q-btn>
        <q-btn dense icon='check' @click="() => {updateValue(), emit('close')}">

        </q-btn>
    </div>


</template>


<script setup lang="ts">

import { ref, onMounted, onUnmounted, inject } from 'vue';

import * as monaco from 'monaco-editor';
import { BaseServiceProvider } from 'alphautils';
import { ICodeEditorService } from 'alphaviewlibrary';
import { StyleService } from '../../../../utils/Services/Designer/StyleService';
import { RunTimeVueApplicationViewModel } from '../../../../ViewModels/RuntimeVueApplicationViewModel';

const refEditorX = ref<HTMLElement | null>(null);

const props = defineProps({
    contextid: {
        type: Number,
        required: false
    },
    value: {
        type: String,
        required: false
}
})
const emit = defineEmits(['updateValue', 'close'])
const service = BaseServiceProvider.ServiceWithContext<ICodeEditorService>("CodeEditorService", props.contextid) as ICodeEditorService
const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel
let editor = null as monaco.editor.IStandaloneCodeEditor | null

onMounted(() => { 

    //prepare css

    const css = StyleService.SetCssSelectors(viewModel.customCss.value)

    viewModel.customCss.value = css
    editor = service.OpenCSSEditor(refEditorX, props.contextid, css, updateValue)
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

.jsoneditor1{
    width: 1005;
    height: 400px;

}

</style>