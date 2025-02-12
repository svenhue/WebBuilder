<template>
    <q-icon size="45px" color="white" class="preview-icon" name="publish"  unelevated >
        <q-menu>
            <q-tabs v-model="tab">
                <q-tab name="Publish" label="Publish">

                </q-tab>
                <q-tab name="Download" label="Download">

                </q-tab>
                <q-tab>

                </q-tab>
            </q-tabs>
            <q-tab-panels v-model="tab">
                <q-tab-panel name="Publish" label="Publish">
                    
                </q-tab-panel>
                <q-tab-panel name="Download" label="Download">
                    <DownloadComponent
                    @download-project="service.DownloadProject(viewModel.GetConfiguration(), viewModel.languageViewModel.GetLanguageFileStrings())"
                    @download-bundle="service.Download(viewModel.GetConfiguration(), viewModel.languageViewModel.GetLanguageFileStrings())"
                    ></DownloadComponent>
                </q-tab-panel>
            </q-tab-panels>
         
        </q-menu>
    </q-icon>
    

</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { ApplicationBuildService } from '../ApplicationBuildService';
import DownloadComponent from './DownloadComponent.vue'
import { RunTimeVueApplicationViewModel } from '../../../../ViewModels/RuntimeVueApplicationViewModel';

const props = defineProps({
    viewModel: {
        required: true,
        type: RunTimeVueApplicationViewModel
    }
})

const service = new ApplicationBuildService();
const tab = ref("Publish")



</script>

<style scoped lang="scss">


.preview-icon{
    cursor: pointer;
    
}

.preview-icon:hover{
    background-color: theme('colors.darkgrey')
}
</style>