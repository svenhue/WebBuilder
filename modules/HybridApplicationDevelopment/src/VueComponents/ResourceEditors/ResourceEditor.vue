<template>

    <div>
        Resource
        <SelectComponent dense :options="resources" v-model="selectedResource" @update:model-value="(val) => viewModel.UpdateNodeType(props.node.id, val.value)">

        </SelectComponent>

        <component :is="editorComponent" :node="node" :contextid="contextid" @updateElement="(values) => emits('updateElement', values)" :currentElement="node"></component>  
    </div>
</template>


<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'

import { INode } from 'alphanodes';
import { nodes } from 'alphanodes';
import { NodeViewModel } from '../../ViewModels/NodeViewModel';
import { computed, ref } from 'vue';
import { NodeTypes } from 'alphanodes/src/node.core/NodeTypes';
import { TaskTypes } from 'alphanodes';
import JavaScriptQueryTaskEditorComponent from './JavaScriptQueryTaskEditorComponent.vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    node: {
        type: Object as () => INode,
        required: false
    },
    viewModel:{
        type: Object as () => NodeViewModel,
        required: true  
    }
})
const emits = defineEmits(['updateElement'])
const selectedResource = ref()

selectedResource.value = props.node.type.name
const resources = Object.entries(nodes.default).map((res) => {
    return {
        label: res[1].type.name,
        value: res[1].type.name
    }
})

const editorComponents =[
    {
        type: TaskTypes['JavaScript.Query'],
        component: JavaScriptQueryTaskEditorComponent
    }
]

const editorComponent = computed(() => {
    if(props.node?.id == undefined || props.node?.id == null) return undefined
    return editorComponents.find(m => m.type === props.node.type.name)?.component
})
</script>