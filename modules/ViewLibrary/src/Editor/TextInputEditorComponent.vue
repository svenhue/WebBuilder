<template>
    <div>
        <div class="editor-input-label"> {{ label }} </div>
                <USelect
                class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'"
                :style="{width: '150px', color: 'white'}"
                
                v-if="mode != 'onlyExpression'" 
                dense 

                :options="options" 
                :model-value="selectModel" 
                @update:model-value="updateExpression">

                </USelect>
        <UInput 
        ref="textRef" 
        dense 
        label-color="white"
        :input-style="{color: 'white!important'}"
        class="t-input-editor-input"
        :model-value="value"
        @update:model-value="(val) => UpdateValue(val)"
        >
        </UInput>  
             <UIcon name="open_in_new" @click="codeEditorIsActive = true">

                </UIcon>
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
import { IViewConfiguration } from 'alphautils';


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

<style lang="scss" scoped>
.editor-input-label{
    color: white;
}

.editor-input{
    color:white;
}

.t-input-editor-input{
    color: white;
    background-color: theme('colors.darkgrey');

    .t-input-editor-select{
        color: white;
        background-color: theme('colors.darkgrey');
    }
}
.t-input-editor-select{
    color: white;
    background-color: theme('colors.darkgrey');
}
</style>