<template>
    <div :id="'jsoneditor_'+viewId">

    </div>
</template>

<script setup lang="ts">
import { waitForElm } from 'alphautils';
import * as JSONEditor  from 'jsoneditor'

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    viewId: {
        type: Number,
        required: true
    }
})
waitForElm('#jsoneditor_'+props.viewId).then((elm) => {
    console.log(elm)
    const container = elm
    const options = {
        mode: 'text'
    }
    const json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"

    }
    console.log(props.viewId, container, JSONEditor)
    const editor = new JSONEditor(container, options)   

    editor.set(json)
})


</script>