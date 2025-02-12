<template>
    <div>
        <JSCodeEditorComponent

        :contextid="contextid"
        :value="node.codeValue">


        </JSCodeEditorComponent>
    </div>

</template>

<script setup lang="ts">
import { INode } from 'alphanodes';
import { JSCodeEditorComponent } from 'alphaviewlibrary';


const props = defineProps({
    contextid:{
        type: Number,
        required:true
    },
    node:{
        type: Object as () => INode,
        required:true
    }
})
</script>