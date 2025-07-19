<template>
    <div class="alpha-options-content" :style="{width: '450px', padding: '10px'}">
        <ExpansionItemComponent
            dense
            :expand-icon-class="'expand-icon-class'"
            label="Colors">
                   <div class="caption_3"> Brand </div>
                   <div dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Brand'))" :key="color.key">
                            <q-item-section>
                                <InputComponent dense disable :model-value="color.key" class="alpha-input">

                                </InputComponent>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </div>
                   <div class="caption_3"> Status </div>
                   <div dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Status'))" :key="color.key">
                            <q-item-section>
                                <InputComponent disable dense :model-value="color.key" class="alpha-input">

                                </InputComponent>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </div>

                   <div class="caption_3"> Text </div>
                   <div dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Text'))" :key="color.key">
                            <q-item-section>
                                <InputComponent disable dense :model-value="color.key" class="alpha-input">

                                </InputComponent>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </div>
        </ExpansionItemComponent>
        <ExpansionItemComponent
            dense
            :expand-icon-class="'expand-icon-class'"
            label="Typography">
        
        </ExpansionItemComponent>
        </div>
</template>

<script setup lang="ts">import { ExpansionItemComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'

import { BaseServiceProvider } from 'alphautils';
import { StyleService } from '../../../utils/Services/Designer/StyleService';
import { ref } from 'vue';
import ColourPickerComponent from '../../Editor/ColourPickerComponent.vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const tab = ref('color')
const styleService = BaseServiceProvider.ServiceWithAppContext('StyleService', props.contextid)?.service as StyleService;

function updateColor(colorKey: string, colorValue: string) {
    styleService.SetColor(colorKey, colorValue);
}
</script>