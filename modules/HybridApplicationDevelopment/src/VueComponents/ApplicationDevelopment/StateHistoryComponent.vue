<template>
    <div :style="{color: 'white', minWidth: '250px'}">
        <div class="drawer-header">
            Version control
            <ButtonComponent class="close-btn" dense unelevated size="10px" icon="close" 
            @click="emits('close')"></ButtonComponent>

        </div>
        <div>
            <ButtonComponent :style="{margin: '5px'}" dense :label="$t('Save Changes')" @click="viewModel.SaveChanges()" ></ButtonComponent>
            <p> {{unsavedChanges}} unsaved Changes</p>
        </div>
        <div>
            Changes
            <q-list>
                <q-item dense
                class="history-stack-item"
                v-for="item in history.history?.value?.values">

                    <q-item-section :style="{position: 'relative'}">
                        <q-item-label>
                            {{changeDescription(item)}}
                        </q-item-label>
                        <q-item-label>
                            <ButtonComponent dense icon="info" borderless unelevated 
                            :style="{position: 'absolute', left: '-18px', top: '-5px'}"  size="sm">

                            </ButtonComponent>
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side :style="{display: 'inline'}"> 
                        <ButtonComponent disable dense icon="undo" borderless unelevated @click="doUndo(item)">
                            <UTooltip>
                            Discard
                            </UTooltip>
                        </ButtonComponent>
                        <ButtonComponent disable dense icon="commit" borderless unelevated @click="doUndo(item)">
                            <UTooltip>
                            Commit
                            </UTooltip>
                        </ButtonComponent>
                    </q-item-section>
                    <q-item-section side>
                      
                    </q-item-section>
                </q-item>

            </q-list>
        </div>
    </div>
</template>


<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

import { BaseServiceProvider, BORepository } from 'alphautils';
import { IHistoryEntrys, IHistoryStack } from 'alphautils/src/Data/StateManagement/StateHistory/IHistoryStack';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';
import { computed, ComputedRef, Ref, inject } from 'vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['close'])
const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel
const changeDescription = (item: IHistoryEntrys) => {
    if(item?.entrys == undefined){
        return item;
    }
    if(item?.entrys != undefined && item?.entrys?.length == 1){
        return item.entrys[0].stateChangeType
    }
    return `Model: ${item?.entrys[0]?.value?.boName}  Changes: ${item.entrys.length}`
}

const boRepository = BaseServiceProvider.ServiceWithContext<BORepository>('BORepository', props.contextid)

const history: ComputedRef<{redoStack: Ref<IHistoryStack>, undoStack: Ref<IHistoryStack>, history: Ref<IHistoryStack>}> = computed(() => {
    return boRepository.GetHistoryComputed(props.contextid).value
})

const unsavedChanges = computed(() => {
    return history.value.history.value.values.filter((value: IHistoryEntrys) => {
        return value.isSavedPermanently == false || value.isSavedPermanently == undefined
    })?.length
})
function doUndo(item: IHistoryEntrys){
    boRepository.ManualHistoryUndo(props.contextid, item)
}

</script>

<style lang="scss">

.history-stack-item{
    border: 1px solid theme('colors.primary');
    margin: 3px;
}
</style>
