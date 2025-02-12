<template>

    <div class="YYYY">
        <ColorInputEditorComponent
        :contextid="props.contextid"
        @update-color="(val) => updateElement(val, 'style.backgroundColor')"
        :label="'Background'"
        :color="backgroundColor">
        
        </ColorInputEditorComponent>
        <ColorInputEditorComponent
        :contextid="props.contextid"
        @update-color="(val) => updateElement(val, 'style.color')"
        :label="'Font Color'"
        :color="fontColor">
        
        </ColorInputEditorComponent>
    </div>

</template>



<script setup lang="ts">

import { reactive, inject, ref } from 'vue';
import { IViewConfiguration, ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';
import ColorInputEditorComponent from './ColorInputEditorComponent.vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const styleManager = inject('styleManager_'+props.contextid) as StyleManagerViewModel
const view = ref<IViewConfiguration>()

const backgroundColor = ref<string>('')
const fontColor = ref<string>('')
defineExpose({
    setStylesFromElement,
})


const emits = defineEmits(['updateElement'])

function setStylesFromElement(v: IViewConfiguration){
    if(view == undefined){
        return;
    }
    view.value = v
    
    switch(v.type){
        default:
            backgroundColor.value = v.style?.backgroundColor ?? ''
            fontColor.value = v.style?.color ?? ''
            break;
    }
    
}

function updateElement(val, key: string){
    if(view.value == undefined){
        return;
    }
    switch(view.value.type){
        default:
            emits('updateElement', [{key: key, value: val}])
            break;
    }
}

</script>

<style scoped lang="scss">

.YYYY{
    background-color: theme('colors.brightgrey');
    overflow:hidden;
}

</style>