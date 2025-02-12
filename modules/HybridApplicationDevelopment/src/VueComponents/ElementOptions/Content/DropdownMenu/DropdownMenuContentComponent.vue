<template>
    <div>
        <q-input dense 
        :model-value="currentElement?.content?.label" 
        @update:model-value="(val) => $emit('updateElement', [{key: 'content.label', value: val}])">
            <template v-slot:before>
                <div class="editor-input-label">Label </div>
            </template>
        </q-input>

        <ComponentChildrenConfiguraton
        :current-element="currentElement">

        </ComponentChildrenConfiguraton>
    </div>

</template>


<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import ComponentChildrenConfiguraton from '../ComponentChildrenConfiguraton.vue';

const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

</script>
