<template>
    <div>
        <ValidationRulesComponent 
        @updateElement="($event) => $emit('updateElement', $event)  "
        :currentElement="currentElement">
        </ValidationRulesComponent>
    </div>

</template>


<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import ValidationRulesComponent from '../ValidationRulesComponent.vue';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

defineEmits(['updateElement'])

</script>