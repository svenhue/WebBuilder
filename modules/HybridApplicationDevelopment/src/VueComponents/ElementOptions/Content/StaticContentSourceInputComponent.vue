<template>
    <q-input
    dense
    filled
    :model-value="url"
    hide-dropdown-icon
    @update:model-value="(val) => $emit('updateUrl', val)">

        <template v-slot:before>
            <div>
                URL
            </div>
        </template>

        <template v-slot:after>
            <q-btn-dropdown dense>
                <q-list>
                    <q-item v-for="option in urlOptions" :key="option" clickable v-ripple
                    @click="() => $emit('updateUrl', option)">
                        <q-item-section>
                            {{ option }}
                        </q-item-section>
                    </q-item>    
                </q-list>
            </q-btn-dropdown>
        </template>

    </q-input>

</template>


<script setup lang="ts">
import { StaticContentURLs } from 'cms';

defineProps({
    url: {
        type: String,
        required: false
    }
})

defineEmits(['updateUrl']);


const urlOptions = Object.entries(StaticContentURLs).map(([key, value]) => {
    return value;
});

</script>
