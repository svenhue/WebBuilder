<template>
    <div>
        <ColourPickerComponent :color="currentElement?.appearence?.controlColor ?? ''" @update-color="(val) => $emit('updateElement', [{key: 'appearence.controlColor', value: val}])">
        </ColourPickerComponent>

        <IconPickerComponent :label="'Navigation icon'" :iconPath="currentElement?.content?.navigationIcon ?? ''" @update-icon-path="(val) => $emit('updateElement', [{key: 'content.navigationIcon', value: val}])">
        </IconPickerComponent>

        <IconPickerComponent :label="'Active navigation icon'" :iconPath="currentElement?.content?.navigationActiveIcon ?? ''" @update-icon-path="(val) => $emit('updateElement', [{key: 'content.navigationActiveIcon', value: val}])">
        </IconPickerComponent>
    </div>
</template>

<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import ColourPickerComponent from '../../../Editor/ColourPickerComponent.vue';
import IconPickerComponent from '../../..//Editor/IconPickerComponent.vue';


defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

defineEmits(['updateElement'])

</script>

