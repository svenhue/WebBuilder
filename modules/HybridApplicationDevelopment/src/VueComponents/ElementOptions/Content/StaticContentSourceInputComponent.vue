<template>
    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'"
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
            <UDropdownMenu>
                <template #default>
                <div>
                    <div v-for="option in urlOptions" :key="option" clickable v-ripple
                    @click="() => $emit('updateUrl', option)">
                        <div>
                            {{ option }}
                        </div>
                    </div>    
                </div>
                </template>
            </UDropdownMenu>
        </template>

    </InputComponent>

</template>


<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

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
