<template>

    <div v-if="ready == true" to="#dev-toolbar" class="dev-toolbar">
        <div :style="{display: 'flex', alignItems: 'center'}">
                <div>
                    <q-btn dense icon="undo" @click="() => viewModel.repository.Undo(viewModel.model.contextid)" :disable="history.undoStack.value?.values.length > 0 ? false : true">

                    </q-btn>
                    <q-btn dense icon="redo" @click="() => viewModel.repository.Redo(viewModel.model.contextid)" :disable="history.redoStack.value?.values.length > 0 ? false : true">
                    </q-btn>
                </div>
                    <ApplicationScreenComponent :style="{
                        marginRight: 0,
                        marginLeft: 'auto',
                    }"
                    :contextid="contextid">

                    </ApplicationScreenComponent>
                    
                    <CommandPaletteSearchBarComponent :style="{
                      
                    }">
                    </CommandPaletteSearchBarComponent>

                    <q-select dense 
                    :options="['design', 'edit']" 
                    :model-value="store.devSettings?.editorMode" 
                    :style="{width: '70px', backgroundColor: 'white', margin: '4px', borderRadius: '4px'}" 
                    @update:model-value="(val) => viewModel.settingsService.ChangeEditorMode(val, viewModel)">
                    </q-select>
                    <DeploymentComponent :view-model="viewModel">

                    </DeploymentComponent>
                </div>
            </div>
</template>

<script setup lang="ts">
import CommandPaletteSearchBarComponent from '../../utils/CommandPalette/VueComponents/CommandPaletteSearchBarComponent.vue';
import ApplicationScreenComponent from './ApplicationScreenComponent.vue'
import DeploymentComponent from '../../utils/Features/Deployment/VueComponent/DeploymentComponent.vue';
import { RunTimeVueApplicationViewModel } from 'src/ViewModels/RuntimeVueApplicationViewModel';
import { computed, ref } from 'vue';
import { useApplicationStore, waitForElm } from 'alphautils';
//import { BrowserDownload, FileTypes  } from 'alphautils';
import { BaseServiceProvider, BORepository } from 'alphautils';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    route: {
        type: Object,
        required: true
    },
    viewModel: {
        type: Object as () =>RunTimeVueApplicationViewModel,
        required: true
    }
})
const ready = ref(false)
const store = useApplicationStore()

waitForElm('#dev-toolbar').then(() => {
    ready.value = true
})

const boRepository = BaseServiceProvider.ServiceWithContext<BORepository>('BORepository', props.contextid)

const history = computed(() => {
    return boRepository.GetHistoryComputed(props.contextid).value
})
</script>

<style lang="scss">

#dev-toolbar{
    display:flex;
    justify-content:center;
    align-items: center;
    width: 100%,
}

</style>