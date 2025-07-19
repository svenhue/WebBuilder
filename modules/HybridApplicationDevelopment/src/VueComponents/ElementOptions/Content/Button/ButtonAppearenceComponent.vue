<template>
    <div>
        <div dense>
            <div dense>
                <UCheckbox
                
                label="Unelevated"
                @update:model-value="(val) => $emit('updateElement', [{key: 'appearence.unelevated', value: val}])"
                :model-value="currentElement?.appearence?.unelevated">

                </UCheckbox>
            </div>
            <div dense>
                <UCheckbox
                label="Round"
                @update:model-value="(val) => $emit('updateElement', [{key: 'appearence.round', value: val}])"
                :model-value="currentElement?.appearence?.round">
                </UCheckbox>
            </div>
        </div>
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