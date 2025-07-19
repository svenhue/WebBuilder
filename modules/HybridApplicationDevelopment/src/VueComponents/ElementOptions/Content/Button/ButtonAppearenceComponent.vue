<template>
    <div>
        <q-list dense>
            <q-item dense>
                <UCheckbox
                
                label="Unelevated"
                @update:model-value="(val) => $emit('updateElement', [{key: 'appearence.unelevated', value: val}])"
                :model-value="currentElement?.appearence?.unelevated">

                </UCheckbox>
            </q-item>
            <q-item dense>
                <UCheckbox
                label="Round"
                @update:model-value="(val) => $emit('updateElement', [{key: 'appearence.round', value: val}])"
                :model-value="currentElement?.appearence?.round">
                </UCheckbox>
            </q-item>
        </q-list>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

defineEmits(['updateElement'])

</script>`;