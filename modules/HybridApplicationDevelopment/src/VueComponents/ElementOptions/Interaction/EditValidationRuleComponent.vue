<template>
        <CardComponent >

            <div>
                Edit Rule
                <ButtonComponent dense :icon="'mdi:close-circle'" @click="$emit('close')"></ButtonComponent>
            </div>
            
            <div>
            
            <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="rule.name" @update:model-value="(val) => $emit('updateElement', {key: 'name', value: val})">
                <template v-slot:before>
                    <div class="editor-input-label" > Name</div>
                </template>
            </InputComponent>

            <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="rule.errorMessage"  @update:model-value="(val) => $emit('updateElement', {key: 'errorMessage', value: val})">
                <template v-slot:before>
                    <div class="editor-input-label" > Error Message</div>
                </template>
            
            </InputComponent>
            
            
            <TextInputEditorComponent
            :requestingComponent="currentElement"
            :contextid="contextid"
            :label="'Rule'" 
            :value="rule.rule" 
            @updateValue="(values) => $emit('updateElement', {key: 'rule', value: values})">
        </TextInputEditorComponent>
        </div>
        </CardComponent>
    
</template>

<script setup lang="ts">import { CardComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { IValueValidationViewConfiguration } from 'alphautils';
import { TextInputEditorComponent } from 'alphaviewlibrary';



defineEmits(['updateElement', 'close'])
defineProps({
    contextid: {
        type: Number,
        required: true
    },
    rule: {
        type: Object,
        required: true
    },
    currentElement:{
        type: Object as  () => IValueValidationViewConfiguration,
        required: true
    }
})



</script>