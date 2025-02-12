<template>
      <q-input dense 
        :model-value="currentElement?.content.label" 
        @update:model-value="(val) => $emit('updateElement', [{key: 'content.label', value: val}])">
            <template v-slot:before>
                <div class="editor-input-label">Label </div>
            </template>
        </q-input>
</template>

<script setup lang="ts">

import { IViewConfiguration } from 'alphautils';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})


defineEmits(['updateElement'])

</script>