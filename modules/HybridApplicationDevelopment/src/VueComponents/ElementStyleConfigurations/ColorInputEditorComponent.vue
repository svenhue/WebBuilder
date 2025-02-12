<template>
    <q-input
    dense
    @update:model-value="(val) => $emit('updateColor', val)"
    :model-value="color"
    >
        <template v-slot:before>
            {{  label  }}
        </template>
        <template v-slot:after>
            <q-btn-dropdown auto-close>
            <q-list dense>
                <q-item dense clickable @click="updateColor(color.key)" v-for="color in avaibleColors" :key="color.label">
                    <q-item-section>
                            {{ color.label }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
        </template>

    </q-input>
</template>

<script setup lang="ts">
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