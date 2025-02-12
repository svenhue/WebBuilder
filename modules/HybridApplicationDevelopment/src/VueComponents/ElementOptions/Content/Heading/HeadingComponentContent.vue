<template>
    <div>
        <TextInputEditorComponent :label="'Text'" 
        :contextid="currentElement.contextid" 
        :value="currentElement?.content?.text" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.text', value: values}])"></TextInputEditorComponent>
        <q-select
        dense
        :options="headingOptions"
        :multiple="false"
        :model-value="currentElement.properties.headingTag"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'properties.headingTag', value: values.value}]) }"
        >

        </q-select>
    </div>
</template>

<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import {TextInputEditorComponent} from 'alphaviewlibrary'

const headingOptions = [{
    label: 'H1',
    value: 'h1'
},
{
    label: 'H2',
    value: 'h2'
},
{
    label: 'H3',
    value: 'h3'
},
{
    label: 'H4',
    value: 'h4'
},
{
    label: 'H5',
    value: 'h5'
},
{
    label: 'H6',
    value: 'h6'

}]
defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})


defineEmits(['updateElement'])

</script>