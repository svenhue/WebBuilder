<template>
    <UIcon size="45px" color="white" class="preview-icon" name="mdi:publish"  unelevated >
        <div>

                    <DownloadComponent
                    @download-config="service.DownloadJson(viewModel.GetConfiguration())"
                    @download-project="service.DownloadProject(viewModel.GetConfiguration(), viewModel.languageViewModel.GetLanguageFileStrings())"
                    @download-bundle="service.Download(viewModel.GetConfiguration(), viewModel.languageViewModel.GetLanguageFileStrings())"
                    ></DownloadComponent>

         
        </div>
    </UIcon>
    

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
const tab = ref("mdi:publish")



</script>

<style scoped lang="scss">


.preview-icon{
    cursor: pointer;
    
}

.preview-icon:hover{
    background-color: var(--color-darkgrey)
}
</style>