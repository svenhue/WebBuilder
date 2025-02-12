<template>
    <div class="application-settings">
         <div class="drawer-header">
            Settings
            <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
            @click="$emit('close')"></q-btn>

        </div>
    <q-splitter  v-model="splitter" :style="{
        height: '100%',
    }">
        <template v-slot:before>
            <q-tabs
            dense
            v-model="tab"
            vertical
            class="app-settings-panels"
            >
                <q-tab name="Theme"  label="Theme"></q-tab>
                <q-tab name="Custom CSS" label="Custom CSS"></q-tab>
                <q-tab name="DevSettings" label="Development"></q-tab>
                <q-tab name="languages" label="Internationalization"></q-tab>
            </q-tabs>
        </template>
        <template v-slot:after>
            <q-tab-panels  dense v-model="tab" swipeable vertical animated>
                <div>123123</div>
                <q-tab-panel dense name="Theme">
                   <ApplicationThemeComponent :contextid="contextid"></ApplicationThemeComponent>
                </q-tab-panel>
                <q-tab-panel dense name="Custom CSS">
                   <CustomCSSEditor :contextid="contextid" :value="viewModel.customCss.value" @update-value="(val) => updateApplicationCSS(val)"></CustomCSSEditor>
                </q-tab-panel>

                <q-tab-panel dense name="DevSettings">
                   <ApplicationDevelopmentSettingsComponent></ApplicationDevelopmentSettingsComponent>
                </q-tab-panel>

                <q-tab-panel name="languages">
                    <ApplicationLanguagesComponent :contextid="appContext">

                    </ApplicationLanguagesComponent>
                </q-tab-panel>
            </q-tab-panels> 
        </template>
    </q-splitter>
</div>
</template> 



<script setup lang="ts">
import { ref, inject } from 'vue';
import ApplicationThemeComponent from './ApplicationSettings/ApplicationThemeComponent.vue';
import CustomCSSEditor from './Features/CustomCSS/CustomCSSEditor.vue';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';
import ApplicationDevelopmentSettingsComponent from './ApplicationSettings/ApplicationDevelopmentSettingsComponent.vue';
import ApplicationLanguagesComponent from './ApplicationSettings/ApplicationLanguagesComponent.vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const tab = ref('mails')
const splitter = ref(20)

defineEmits(['close'])



const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel

const appContext = viewModel.model.contextid

function updateApplicationCSS(css){
    //todo update prop and html dom

    viewModel.customCss.value = css
    viewModel.styleService.SetApplicationCss(css, props.contextid)
}

</script>

<style scoped lang="scss">

.application-settings {
    width: 700px;

    .app-settings-panels{
        background-color: white;
        color: black
    }

}
</style>