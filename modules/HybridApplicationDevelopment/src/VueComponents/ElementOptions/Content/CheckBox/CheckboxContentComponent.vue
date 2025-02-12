<template>
    <div>
        <TextInputEditorComponent 
        :contextid="currentElement.contextid"
        :label="'Text'" 
        :value="currentElement?.content?.label" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.label', value: values}])">
        </TextInputEditorComponent>

    </div>
</template>

<script setup lang="ts">

import { IViewConfiguration } from 'alphautils';
import {TextInputEditorComponent} from 'alphaviewlibrary'

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})




</script>