<template>
    <div class="application-settings">
         <div class="drawer-header">
            Settings
            <ButtonComponent class="close-btn" dense unelevated size="10px" :icon="'mdi:close-circle'" 
            @click="$emit('close')"></ButtonComponent>

        </div>

        <UTabs :items="items" orientation="vertical" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
             <template #DevSettings="{ item }">
                      <ApplicationDevelopmentSettingsComponent></ApplicationDevelopmentSettingsComponent>
             </template>
             <template #languages="{ item }">
                             <ApplicationLanguagesComponent :contextid="appContext">

                    </ApplicationLanguagesComponent>
             </template>
        </UTabs>
</div>
</template> 



<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

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
const items = [
    {
        value: 'DevSettings',
        label: 'DevSettings',
        slot: 'DevSettings'
    },{
        value: 'languages',
        label: 'Languages',
        slot: 'languages'
    }
]
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