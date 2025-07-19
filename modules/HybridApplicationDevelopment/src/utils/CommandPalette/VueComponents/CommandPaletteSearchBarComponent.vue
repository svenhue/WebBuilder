<template>
    <SelectComponent 
    dense 
    multiple
    use-chips
    v-model="viewModel.modelValue.value"
    :id="132"
    filled
    disable
    
    bg-color="white"
    outlined
    for="poh9phjqwpf819234_neofr" 
    use-input
    autocomplete
    
    standout
    :style="{
           
            width: '600px'
        }"
    >
        <template #option="scope">
            <div>
                <div-section class="text-grey">
                    {{ scope.itemProps.label }}
                </div-section>
            </div>
        </template>
    </SelectComponent>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'

import { CommandPaletteViewModel } from '../ViewModels/CommandPaletteViewModel';
import { ref, watch } from 'vue';

const viewModel = new CommandPaletteViewModel();
const X = ref(['tt'])

watch(X, (value) => {
    console.log(value)
})
</script>