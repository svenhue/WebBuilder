<template>
    <div>
        <div class="drawer-header">
            Version control
            <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
            @click="emits('close')"></q-btn>

        </div>
        <div>
            Pending
            <q-list>
                todo
            </q-list>
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
                            <q-btn dense icon="info" borderless unelevated 
                            :style="{position: 'absolute', left: '-18px', top: '-5px'}"  size="sm">

                            </q-btn>
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side :style="{display: 'inline'}"> 
                        <q-btn dense icon="undo" borderless unelevated @click="doUndo(item)">
                            <q-tooltip>
                            Discard
                            </q-tooltip>
                        </q-btn>
                        <q-btn dense icon="commit" borderless unelevated @click="doUndo(item)">
                            <q-tooltip>
                            Commit
                            </q-tooltip>
                        </q-btn>
                    </q-item-section>
                    <q-item-section side>
                      
                    </q-item-section>
                </q-item>

            </q-list>
        </div>
    </div>
</template>


<script setup lang="ts">
import { BaseServiceProvider, BORepository } from 'alphautils';
import { IHistoryEntry, IHistoryEntrys, IHistoryStack } from 'alphautils/src/Data/StateManagement/StateHistory/IHistoryStack';
import { computed, ComputedRef, Ref, watch } from 'vue';


const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const changeDescription = (item: IHistoryEntrys) => {
    if(item?.entrys == undefined){
        return item;
    }
    if(item?.entrys != undefined && item?.entrys?.length == 1){
        return item.entrys[0].stateChangeType
    }
    return `Number of changes: ${item.entrys.length}`
}

const boRepository = BaseServiceProvider.ServiceWithContext<BORepository>('BORepository', props.contextid)

const history: ComputedRef<{redoStack: Ref<IHistoryStack>, undoStack: Ref<IHistoryStack>, history: Ref<IHistoryStack>}> = computed(() => {
    return boRepository.GetHistoryComputed(props.contextid).value
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
