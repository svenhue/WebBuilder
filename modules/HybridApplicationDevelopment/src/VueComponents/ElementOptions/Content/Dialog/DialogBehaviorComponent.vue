<template>
    <UCheckbox label="Full width" :model-value="currentElement.properties?.fullwidth" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.fullwidth', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="Full height" :model-value="currentElement.properties?.fullheight" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.fullheight', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="Maximized" :model-value="currentElement.properties?.maximized" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.maximized', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="persistent" :model-value="currentElement.properties?.persistent"  @update:model-value="(values) => $emit('updateElement', [{key: 'properties.persistent', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="No esc-dismiss" :model-value="currentElement.properties?.noescdismiss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.noescdismiss', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="No backdrop-dismiss" :model-value="currentElement.properties?.nobackdropdismiss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.nobackdropdismiss', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="No route-dismiss" :model-value="currentElement.properties?.noroutedismuss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.noroutedismuss', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="Auto-close" :model-value="currentElement.properties?.autoclose" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.autoclose', value: values}])">
    
    </UCheckbox>
    <UCheckbox label="No-refocus" :model-value="currentElement.properties?.norefocus" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.nofocus', value: values}])">
    
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