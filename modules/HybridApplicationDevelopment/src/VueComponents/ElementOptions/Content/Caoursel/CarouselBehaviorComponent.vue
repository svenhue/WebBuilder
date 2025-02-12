<template>
    <q-checkbox
    label="Animated"
        :model-value="currentElement?.behavior?.animated ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.animated', value: values}])}"
    >
    </q-checkbox>
    <q-checkbox
    label="Infinite"
        :model-value="currentElement?.behavior?.infinite ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.infinite', value: values}])}"
    >
    </q-checkbox>
    <q-checkbox
    label="Swipeable"
        :model-value="currentElement?.behavior?.swipeable ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.swipeable', value: values}])}"
    >
    </q-checkbox>
    <q-checkbox
    label="Vertical"
        :model-value="currentElement?.behavior?.vertical ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.vertical', value: values}])}"
    >
    </q-checkbox>    
    <q-checkbox
    label="Autoplay"
        :model-value="currentElement?.behavior?.autoplay ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'behavior.autoplay', value: values}])}"
    >
    </q-checkbox>
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