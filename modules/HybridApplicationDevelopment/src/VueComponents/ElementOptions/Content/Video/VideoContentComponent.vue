<template>
    <div>
        <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="currentElement.content?.src ?? ''" @update:model-value="(val) => $emit('updateElement', [{key: 'content.src', value: val}])">

        </InputComponent>
    </div>
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