<template>
    <div class="application-style alpha-left-drawer-options-tab-content">
        <div class="drawer-header">
            Style
            <ButtonComponent class="close-btn" dense unelevated size="10px" icon="close" 
            @click="$emit('close')"></ButtonComponent>

        </div>
        <UTabs :items="items" orientation="horizontal">
            <template #theme>
                    <ApplicationThemeComponent :contextid="contextid"></ApplicationThemeComponent>
            </template>
            <template #css>
                   <CustomCSSEditor :contextid="contextid" :value="viewModel.customCss.value" @update-value="(val) => updateApplicationCSS(val)"></CustomCSSEditor>
            </template>
        </UTabs>

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

const items = [
    {
        label: 'Theme',
        value: 'theme',
        slot: 'theme'
    },
    {
        label: 'Custom CSS',
        value: 'css',
        slot: 'css'
    }
]

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