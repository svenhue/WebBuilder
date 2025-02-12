<template>
    <div>
       <q-tabs
            dense
            v-model="tab"
            vertical
            class="text-teal"
            >
                <q-tab name="color" dense  label="Color"></q-tab>
                <q-tab name="typography" dense  label="Typography"></q-tab>
        </q-tabs>
      
            <q-tab-panels dense v-model="tab" swipeable vertical animated>
                <q-tab-panel dense name="color">
                   <div class="caption_3"> Brand </div>
                   <q-list dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Brand'))" :key="color.key">
                            <q-item-section>
                                <q-input dense disable :model-value="color.key">

                                </q-input>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </q-list>
                   <q-separator class="seperator"></q-separator>
                   <div class="caption_3"> Status </div>
                   <q-list dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Status'))" :key="color.key">
                            <q-item-section>
                                <q-input disable dense :model-value="color.key">

                                </q-input>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </q-list>
                   <q-separator class="seperator"></q-separator>

                   <div class="caption_3"> Text </div>
                   <q-list dense>
                        <q-item dense v-for="color in styleService.GetColors().filter(c => c.key?.includes('Text'))" :key="color.key">
                            <q-item-section>
                                <q-input disable dense :model-value="color.key">

                                </q-input>
                            </q-item-section>
                            <q-item-section>
                                <ColourPickerComponent :color="color.value" @update-color="(c) => updateColor(color.key, c)">
                                </ColourPickerComponent>
                            </q-item-section>
                        </q-item>
                   </q-list>
                </q-tab-panel>
            </q-tab-panels> 
        </div>
</template>

<script setup lang="ts">
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