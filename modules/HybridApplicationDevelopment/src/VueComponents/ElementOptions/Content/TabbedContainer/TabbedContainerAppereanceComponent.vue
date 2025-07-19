<template>
    <div>
        <div>
            <q-item dense>
                <UCheckbox label="Vertical" :model-value="currentElement.appearance?.isVertical" @update:model-value="(val) => emits('updateElement', [{key:'appearance.isVertical', value: val}])">

                </UCheckbox>
            </q-item>
            <q-item>
                <SelectComponent 
                dense
                :model-value="currentElement.appearance?.alignment"
                @update:model-value="(val) => emits('updateElement', [{key:'appearance.alignment', value: val}])"
                :options="['center', 'left', 'right', 'justify']">

                </SelectComponent>
            </q-item>
        </div>
    </div>
</template>


<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'

import { IViewConfiguration, useViewConfiguration } from 'alphautils';


const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const emits = defineEmits(['updateElement'])
</script>