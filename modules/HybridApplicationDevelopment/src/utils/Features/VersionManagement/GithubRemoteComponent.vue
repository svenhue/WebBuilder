<template>
    <div>
        <InputComponent @update:model-value="(val) => emits('updateProperty', {key: 'url', value: val})" label="Url" v-model="url" ></InputComponent>

        <InputComponent @update:model-value="(val) => emits('updateProperty', {key: 'token', value: val})" label="Token" v-model="token"></InputComponent>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

import { ref } from 'vue';


const props = defineProps({
    contextid: {
        type: Number,
        required: false
    }
})
const emits = defineEmits(['updateProperty'])

const url = ref('')
const token = ref('')

</script>