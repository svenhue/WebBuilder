<template>
    <q-input dense :model-value="iconPath" @update:model-value="(val) => $emit('updateIconPath', val)">
        <template v-slot:before>
            <div class="editor-input-label">
                {{label}}
            </div>
        </template>
    </q-input>
</template>

<script setup lang="ts">

defineProps({
    iconPath: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})

defineEmits(['updateIconPath'])
</script>