<template>
    <div>
        <q-input dense 
        :model-value="currentElement?.content?.text" 
        @update:model-value="(val) => $emit('updateElement', [{key: 'content.text', value: val}])">
            <template v-slot:before>
                <div class="editor-input-label">Text </div>
            </template>
        </q-input>
        <q-input dense
        :model-value="currentElement?.content?.url"
        @update:model-value="(val) => $emit('updateElement', [{key: 'content.url', value: val}])">
            <template v-slot:before>
                <div class="editor-input-label">URL </div>
            </template>
        </q-input>
    </div>

</template>


<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import TextInputEditorComponent from 'alphaviewlibrary/src/Editor/TextInputEditorComponent.vue';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const emits = defineEmits(['updateElement']);
</script>