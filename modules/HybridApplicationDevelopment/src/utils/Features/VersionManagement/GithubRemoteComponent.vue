<template>
    <div>
        <q-input @update:model-value="(val) => emits('updateProperty', {key: 'url', value: val})" label="Url" v-model="url" ></q-input>

        <q-input @update:model-value="(val) => emits('updateProperty', {key: 'token', value: val})" label="Token" v-model="token"></q-input>
    </div>
</template>

<script setup lang="ts">
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