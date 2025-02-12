<template>
    <div>
        <q-input  
        ref="textRef" 
        dense 
        :model-value="value"
        @update:model-value="(val) => UpdateValue(val)"
        >
            <template v-slot:before>
                <div class="editor-input-label"> {{ label }} </div>
                <q-select v-if="mode != 'onlyExpression'" dense :options="options" :model-value="selectModel" @update:model-value="updateExpression">

                </q-select>
            </template>
            <template v-slot:after>
                <q-icon name="open_in_new" @click="codeEditorIsActive = true">

                </q-icon>
            </template>
        </q-input>  
        <Teleport  :to="'#XXX'"  v-if="codeEditorIsActive && style == undefined">
            <JSCodeEditorComponent
            @close="codeEditorIsActive = false"
            @updateValue="(val) => UpdateValue(val)"  
            :style="codeEditorStyle"
            :isExpression="true"
            :value="value"
            :requestingComponent="requestingComponent"
            :contextid="contextid">

            </JSCodeEditorComponent>
        </Teleport>
        <JSCodeEditorComponent
        v-else-if="codeEditorIsActive"
        @close="() => {codeEditorIsActive = false, $emit('close')}"
        @updateValue="(val) => UpdateValue(val)"  
        :style="codeEditorStyle"
        :isExpression="true"
        :value="value"
        :requestingComponent="requestingComponent"
        :contextid="contextid">

        </JSCodeEditorComponent>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import JSCodeEditorComponent from './JSCodeEditorComponent.vue';
import { ExpressionValidator } from 'alphautils';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';


const props = defineProps({
    label: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: true
    },
    contextid: {
        type: Number,
        required: false
    },
    style: {
        type: Object,
        required: false
    },
    mode: {
        type: String,
        required: false
    },
    requestingComponent:{
        type: Object as () => IViewConfiguration,
        required: false
    }
})
const emits = defineEmits(['updateValue', 'close'])

const textRef = ref(null)
const isExpression = ref(false)
const selectModel = ref('')
const codeEditorIsActive = ref(false)
const options = [
    {
        label: 'Expression',
        value: 'Expression'
    },
    {
        label: 'Text',
        value: 'Text'
    }
]
const codeEditorStyle = computed(() => {

    if(props.style != undefined){
        return props.style
    }else{

        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '200px',
            zIndex: 9999
        }
    }
})

function updateExpression(value: string) {
    selectModel.value = value.value
    if (value.value == 'Expression') {
        isExpression.value = true
        codeEditorIsActive.value = true
    } else {
        isExpression.value = false
    }
    
}
function UpdateValue(code: string) {
    if(ExpressionValidator.ValidateExpression(code) == true){
        selectModel.value = 'Expression'
    }
    else{
        selectModel.value = 'Text'
    }
    emits('updateValue', code)
}
</script>