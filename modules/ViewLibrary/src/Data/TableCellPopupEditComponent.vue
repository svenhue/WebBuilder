<template>

    <q-popup-edit
    ref="popupEditRef"
    :title="title"
    :auto-save="autoSave"
    :model-value="modelValue"
    @update:model-value="($event) => $emit('update:modelValue', $event)"
    v-slot="scope">
        <q-input v-if=" basicTypes.includes(getType())" dense v-model="scope.value" autofocus @keyup.enter="scope.set" :type="getType()">

        </q-input>
        <div  v-else-if="getType() == 'textOrExpression'"  ref="editorRef" >
            <TextInputEditorComponent 
            :contextid="contextid"
            @close="popupEditRef.hide()"
            :label="title" 
            :value="modelValue" 
            @updateValue="($event) => $emit('update:modelValue', $event)"
            :style="editorStyle">
            </TextInputEditorComponent>
        </div>
    </q-popup-edit>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TextInputEditorComponent from '../Editor/TextInputEditorComponent.vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    autoSave: {
        type: Boolean,
        required: false,
        default: false
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    contextid: {
        type: Number,
        required: false
    }
})

const popupEditRef = ref<HTMLElement>(null)
const editorRef = ref<HTMLElement>(null)
const basicTypes = ['text', 'password', 'email', 'number', 'tel', 'url']

function getType() {
    return props.type != undefined ? props.type : 'text'
}

const editorStyle = computed(() => {
    return {
        zIndex: 99999,
        width: '450px',
        height: '300px',
    }
})

defineEmits(['update:modelValue'])
</script>