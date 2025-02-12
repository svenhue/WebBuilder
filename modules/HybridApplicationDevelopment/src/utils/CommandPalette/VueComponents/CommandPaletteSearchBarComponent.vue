<template>
    <q-select 
    dense 
    multiple
    use-chips
    v-model="viewModel.modelValue.value"
    :id="132"
    filled
    
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
            <q-item>
                <q-item-section class="text-grey">
                    {{ scope.itemProps.label }}
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import { CommandPaletteViewModel } from '../ViewModels/CommandPaletteViewModel';
import { ref, watch } from 'vue';

const viewModel = new CommandPaletteViewModel();
const X = ref(['tt'])

watch(X, (value) => {
    console.log(value)
})
</script>