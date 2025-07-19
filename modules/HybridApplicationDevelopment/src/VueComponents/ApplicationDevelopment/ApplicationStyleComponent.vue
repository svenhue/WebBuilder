<template>
    <div class="application-style alpha-left-drawer-options-tab-content">
        <div class="drawer-header">
            Style
            <ButtonComponent class="close-btn" dense unelevated size="10px" icon="close" 
            @click="$emit('close')"></ButtonComponent>

        </div>

         <q-splitter class="alpha-splitter-tabs" v-model="splitter">
        <template v-slot:before>
            <q-tabs
            dense
            v-model="tab"
            vertical
     
            >
                <q-tab name="Theme"  label="Theme"></q-tab>
                <q-tab name="Custom CSS" label="Custom CSS"></q-tab>
            </q-tabs>
        </template>
        <template v-slot:after>
            <q-tab-panels  dense v-model="tab" swipeable vertical animated>
                <q-tab-panel dense name="Theme">
                   <ApplicationThemeComponent :contextid="contextid"></ApplicationThemeComponent>
                </q-tab-panel>
                <q-tab-panel dense name="Custom CSS">
                   <CustomCSSEditor :contextid="contextid" :value="viewModel.customCss.value" @update-value="(val) => updateApplicationCSS(val)"></CustomCSSEditor>
                </q-tab-panel>
            </q-tab-panels> 
        </template>
    </q-splitter>

    </div>

</template>


<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

import { ref, inject } from 'vue';
import ApplicationThemeComponent from './ApplicationSettings/ApplicationThemeComponent.vue';

import CustomCSSEditor from './Features/CustomCSS/CustomCSSEditor.vue';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

defineEmits(['close'])

const tab = ref('mails')
const splitter = ref(20)

const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel

const appContext = viewModel.model.contextid

function updateApplicationCSS(css){
    //todo update prop and html dom

    viewModel.customCss.value = css
    viewModel.styleService.SetApplicationCss(css, props.contextid)
}
</script>


<style lang="scss">

.application-style {

}

</style>