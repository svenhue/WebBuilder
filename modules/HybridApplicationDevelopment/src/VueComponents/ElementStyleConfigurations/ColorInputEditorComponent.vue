<template>
    <InputComponent
    dense
    class="alpha-input-color"
    @update:model-value="(val) => $emit('updateColor', val)"
    :model-value="color"
    label-color="white"
    :input-style="{ color: 'white' }"
    >
        <template v-slot:before>
            <div :style="{color: 'white', fontSize: '14px'}">
            {{  label  }}
            </div>
        </template>
        <template v-slot:after>
            <UDropdownMenu  auto-close dense>
                <template #default>
                                    <div dense class="dropdown-list">
                    <q-item dense clickable @click="updateColor(color.key)" v-for="color in avaibleColors" :key="color.label">
                        <div 
                        :style="{backgroundColor: color.value, marginTop: '8px', marginRight: '5px', width: '10px', height: '10px'}">
                      
                        </div>
                        <q-item-section>
                                {{ color.label }}
                        </q-item-section>
                        
                    </q-item>
                </div>
                </template>

            </UDropdownMenu>
        </template>

    </InputComponent>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

import { BaseServiceProvider } from 'alphautils';
import { StyleService } from 'src/utils/Services/Designer/StyleService';
import { computed, ref } from 'vue';

const props = defineProps({
    color: {
        type: String,
        required: true
    },
    contextid: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['updateColor'])

const styleService = BaseServiceProvider.ServiceWithAppContext('StyleService', props.contextid)?.service as StyleService;

const avaibleColors = computed(() => {
    return styleService.GetColors()?.map((color) => {
        return {
            key: color.key,
            label: color.key + ':' + color.value,
            value: color.value
        }
    });
})

function updateColor(val){
    emits('updateColor', `{{ colors.${val} }}` )
}
</script>

<style lang="scss" scoped>

.alpha-input-color{
    border-radius: 10px;



}
    .dropdown-list{
        background-color: theme('colors.brightgrey');
        color: white;
    }
</style>