<template>
    <div>
        <q-input class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="currentElement.content?.src ?? ''" @update:model-value="(val) => $emit('updateElement', [{key: 'content.src', value: val}])">

        </q-input>
    </div>
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