<template>
        <q-card >

            <q-card-section>
                Edit Rule
                <ButtonComponent dense icon='close' @click="$emit('close')"></ButtonComponent>
            </q-card-section>
            
            <q-card-section>
            
            <q-input class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="rule.name" @update:model-value="(val) => $emit('updateElement', {key: 'name', value: val})">
                <template v-slot:before>
                    <div class="editor-input-label" > Name</div>
                </template>
            </q-input>

            <q-input class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="rule.errorMessage"  @update:model-value="(val) => $emit('updateElement', {key: 'errorMessage', value: val})">
                <template v-slot:before>
                    <div class="editor-input-label" > Error Message</div>
                </template>
            
            </q-input>
            
            
            <TextInputEditorComponent
            :requestingComponent="currentElement"
            :contextid="contextid"
            :label="'Rule'" 
            :value="rule.rule" 
            @updateValue="(values) => $emit('updateElement', {key: 'rule', value: values})">
        </TextInputEditorComponent>
        </q-card-section>
        </q-card>
    
</template>

<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

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