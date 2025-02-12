<template>
    <div>
        <TextInputEditorComponent :label="'Label'" 
        :contextid="currentElement.contextid" 
        :value="currentElement?.content?.label ?? ''" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.label', value: values}])">
        </TextInputEditorComponent>
        <TextInputEditorComponent :label="'Caption'" 
        :contextid="currentElement.contextid" 
        :value="currentElement?.content?.text ?? ''" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.caption', value: values}])">
        </TextInputEditorComponent>
        <q-checkbox dense
        label="Show toggle on left side"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'properties.switchToggleSide', value: values}])}"
        :model-value="currentElement.properties?.switchToggleSide">

        </q-checkbox>
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


defineEmits(['updateElement'])

</script>