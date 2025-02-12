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
            <q-btn dense icon='add' @click='addOption()'></q-btn>
        </div>
        <q-list dense>
     
            <q-item dense v-for="option in options" :key="option.value" >
                <q-item-section>
                    <q-input dense :model-value="option.value" @update:model-value="(val) => saveUpdate(val, option)" @mouseout="updateOptions()" >
                    </q-input>
                </q-item-section>
                <q-item-section side>
                    <q-btn dense icon='delete' @click='deleteOption(option)'></q-btn>^
                </q-item-section>
            </q-item>
        </q-list>

        <q-checkbox v-model="showLabelInInput"
        :label="'Zeige Label im Feld'"
        @update:model-value="(v) => $emit('updateElement', [{key: 'properties.showLabelInInput', value: v}])"
        >

        </q-checkbox>
    </div>
</template>


<script setup lang="ts">
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
    console.log(options.value)
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