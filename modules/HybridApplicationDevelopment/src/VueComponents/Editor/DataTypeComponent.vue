<template>
    <q-select dense :options="dataTypes" :model-value="currentElement.content.dataType" 
    @update:model-value="(val) => $emit('updateElement', [{key: 'content.dataType', value: val.value}])">

        <template v-slot:before>
            <div class="editor-input-label">
                Data Type
            </div>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import {  IViewConfiguration } from 'alphautils';

defineEmits(['updateElement'])

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const dataTypes = [
    {
        label : 'Text',
        value: 'text'
    },
    {
        label : 'Number',
        value: 'number'
    },
    {
        label : 'Date',
        value: 'date'
    },
    {
        label : 'Time',
        value: 'time'
    },
    {
        label : 'DateTime',
        value: 'datetime'
    },
    {
        label : 'Password',
        value: 'password'
    },
    {
        label : 'Email',
        value: 'email'
    },
    {
        label : 'Url',
        value: 'url'
    },
    {
        label : 'Search',
        value: 'search'
    },
    {
        label : 'Number',
        value: 'number'
    },
    {
        label: 'Datetime-local',
        value: 'datetime-local'
    },
    {
        label: 'Tel',
        value: 'tel'
    },
    {
        label: 'File',
        value: 'file'
    }
]
</script>


