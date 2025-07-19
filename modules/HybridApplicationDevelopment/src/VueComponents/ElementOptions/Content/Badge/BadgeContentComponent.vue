<template>
      <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense 
        :model-value="currentElement?.content.label" 
        @update:model-value="(val) => $emit('updateElement', [{key: 'content.label', value: val}])">
            <template v-slot:before>
                <div class="editor-input-label">Label </div>
            </template>
        </InputComponent>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'


import { IViewConfiguration } from 'alphautils';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})


defineEmits(['updateElement'])

</script>