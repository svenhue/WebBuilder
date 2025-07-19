<template>
    <UCheckbox
    label="Animated"
        :model-value="currentElement?.behavior?.animated ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.animated', value: values}])}"
    >
    </UCheckbox>
    <UCheckbox
    label="Infinite"
        :model-value="currentElement?.behavior?.infinite ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.infinite', value: values}])}"
    >
    </UCheckbox>
    <UCheckbox
    label="Swipeable"
        :model-value="currentElement?.behavior?.swipeable ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.swipeable', value: values}])}"
    >
    </UCheckbox>
    <UCheckbox
    label="Vertical"
        :model-value="currentElement?.behavior?.vertical ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.vertical', value: values}])}"
    >
    </UCheckbox>    
    <UCheckbox
    label="Autoplay"
        :model-value="currentElement?.behavior?.autoplay ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.autoplay', value: values}])}"
    >
    </UCheckbox>
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