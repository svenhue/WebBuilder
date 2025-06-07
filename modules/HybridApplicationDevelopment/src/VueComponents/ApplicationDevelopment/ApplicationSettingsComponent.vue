<template>
    <div class="application-settings">
         <div class="drawer-header">
            Settings
            <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
            @click="$emit('close')"></q-btn>

        </div>
    <q-splitter class="alpha-splitter-tabs"  v-model="splitter" :style="{
        height: '100%',
    }">
        <template v-slot:before>
            <q-tabs
            dense
            v-model="tab"
            vertical
            >
                <q-tab name="DevSettings" label="Development"></q-tab>
                <q-tab name="languages" label="Internationalization"></q-tab>
            </q-tabs>
        </template>
        <template v-slot:after>
            <q-tab-panels  dense v-model="tab" swipeable vertical animated>
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

</script>

<style scoped lang="scss">

.application-settings {


}
</style>