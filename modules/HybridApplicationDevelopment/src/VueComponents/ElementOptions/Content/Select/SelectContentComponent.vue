<template>
    <div>
        <TextInputEditorComponent 
        :contextid="currentElement.contextid"
        :label="'Text'" 
        :value="currentElement?.content?.label ?? ''" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.label', value: values}])">
        </TextInputEditorComponent>
        <div>
            Options   
            <ButtonComponent dense icon='add' @click='addOption()'></ButtonComponent>
        </div>
        <div dense>
     
            <div dense v-for="option in options" :key="option.value" >
                <div>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="option.value" @update:model-value="(val) => saveUpdate(val, option)" @mouseout="updateOptions()" >
                    </InputComponent>
                </div>
                <div side>
                    <ButtonComponent dense icon='delete' @click='deleteOption(option)'></ButtonComponent>^
                </div>
            </div>
        </div>

        <UCheckbox v-model="showLabelInInput"
        :label="'Zeige Label im Feld'"
        @update:model-value="(v) => $emit('updateElement', [{key: 'properties.showLabelInInput', value: v}])"
        >

        </UCheckbox>
    </div>
</template>


<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { IViewConfiguration } from 'alphautils';
import { ref, watch } from 'vue';
import { TextInputEditorComponent } from 'alphaviewlibrary';

const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})
const emits = defineEmits(['updateElement'])

const showLabelInInput = ref<boolean>(false)
const options = ref<object[]>([])

const oldvalue = ref<string>(null)
const savedValue = ref<object>({})

watch(props.currentElement, (newVal) => {
    options.value = newVal.content?.options ?? []
})
options.value = props.currentElement.content?.options ?? []

function updateOptions(){
    if(oldvalue.value == null){
        return
    }
    const i = options.value.findIndex(x => x.value == oldvalue.value)
    options.value.splice(i, 1, savedValue.value)
    emits('updateElement', [{key: 'content.options', value: JSON.parse(JSON.stringify(options.value))}])
    oldvalue.value = null
    savedValue.value = {}
}

function addOption(){
    options.value.push({label: '', value:''})
    emits('updateElement', [{key: 'content.options', value: JSON.parse(JSON.stringify(options.value))}])
}

function saveUpdate(val: string, option){
    if(oldvalue.value == null){       
        oldvalue.value = option.value
    }
    savedValue.value = {value: val, label: val}
}

function deleteOption(option){
    const i = options.value.findIndex(x => x.value == option.value)
    options.value.splice(i, 1)
    emits('updateElement', [{key: 'content.options', value: JSON.parse(JSON.stringify(options.value))}])
}
</script>