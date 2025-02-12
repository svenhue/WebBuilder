<template>
    <div>
        <q-list>
            <q-item dense>
                <q-checkbox label="Vertical" :model-value="currentElement.appearance?.isVertical" @update:model-value="(val) => emits('updateElement', [{key:'appearance.isVertical', value: val}])">

                </q-checkbox>
            </q-item>
            <q-item>
                <q-select 
                dense
                :model-value="currentElement.appearance?.alignment"
                @update:model-value="(val) => emits('updateElement', [{key:'appearance.alignment', value: val}])"
                :options="['center', 'left', 'right', 'justify']">

                </q-select>
            </q-item>
        </q-list>
    </div>
</template>


<script setup lang="ts">
import { IViewConfiguration, useViewConfiguration } from 'alphautils';


const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const emits = defineEmits(['updateElement'])
</script>