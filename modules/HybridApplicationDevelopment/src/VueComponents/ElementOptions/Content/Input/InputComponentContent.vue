<template>
    <div>
        <TextInputEditorComponent 
        :contextid="currentElement.contextid"
        :label="'Text'" 
        :value="currentElement?.content?.label" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.label', value: values}])">
        </TextInputEditorComponent>
        <DataTypeComponent
        @update-element="($event) => $emit('updateElement', $event)" 
        :currentElement="currentElement">
        </DataTypeComponent>
        <q-checkbox v-model="showLabelInInput"
        :label="'Zeige Label im Feld'"
        @update:model-value="(v) => $emit('updateElement', [{key: 'properties.showLabelInInput', value: v}])"
        >

        </q-checkbox>
    </div>
</template>

<script setup lang="ts">

import { IViewConfiguration } from 'alphautils';
import {TextInputEditorComponent} from 'alphaviewlibrary'
import { ref } from 'vue';
import DataTypeComponent from '../../../Editor/DataTypeComponent.vue';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const showLabelInInput = ref<boolean>(false)


</script>