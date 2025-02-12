<template>
    <q-checkbox label="Full width" :model-value="currentElement.properties?.fullwidth" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.fullwidth', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="Full height" :model-value="currentElement.properties?.fullheight" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.fullheight', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="Maximized" :model-value="currentElement.properties?.maximized" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.maximized', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="persistent" :model-value="currentElement.properties?.persistent"  @update:model-value="(values) => $emit('updateElement', [{key: 'properties.persistent', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="No esc-dismiss" :model-value="currentElement.properties?.noescdismiss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.noescdismiss', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="No backdrop-dismiss" :model-value="currentElement.properties?.nobackdropdismiss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.nobackdropdismiss', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="No route-dismiss" :model-value="currentElement.properties?.noroutedismuss" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.noroutedismuss', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="Auto-close" :model-value="currentElement.properties?.autoclose" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.autoclose', value: values}])">
    
    </q-checkbox>
    <q-checkbox label="No-refocus" :model-value="currentElement.properties?.norefocus" @update:model-value="(values) => $emit('updateElement', [{key: 'properties.nofocus', value: values}])">
    
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