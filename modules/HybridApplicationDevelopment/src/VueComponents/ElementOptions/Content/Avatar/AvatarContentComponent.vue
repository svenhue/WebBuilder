<template>
    <div>
        
        <TextInputEditorComponent
        @updateValue="(val) => emits('updateElement', [{key:'properties.icon', value: val}])"
        :value="props.currentElement?.properties?.icon ?? 'account_circle'"
        :contextid="props.currentElement.contextid">

        </TextInputEditorComponent>
        
    </div>
</template>


<script setup lang="ts">
import { ImageSource } from 'alphaviewlibrary';
import { ref } from 'vue'

import TextInputEditorComponent from 'alphaviewlibrary/src/Editor/TextInputEditorComponent.vue';
const props = defineProps({
    currentElement: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['updateElement'])

</script>