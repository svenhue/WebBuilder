<template>
    <div class="development-context-bar">
        <q-menu  context-menu  @hide="emits('hide')"  ref="test" auto-close   touch-position>
            <q-list>
                <q-item clickable @click="deleteView()">
                    <q-item-section>
                        <q-item-label>Delete View</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click="() => ShowTemplateDialog()">
                    <q-item-section>
                        <q-item-label>Save as template</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>

        <CreateTemplateDialogComponent
        :show="showTemplateDialog"
        ref="createTemplateDialogComponent"
        :contextid="contextid"
        @close="showTemplateDialog = false"
        :value="element">


        </CreateTemplateDialogComponent>
    </div>
</template>

<script setup lang="ts">
import { ref , onMounted} from 'vue';
import { waitForElm } from 'alphautils';
import CreateTemplateDialogComponent from './ApplicationDevelopment/Features/Templates/CreateTemplateDialogComponent.vue';

const props = defineProps({
    targetId: {
        type: String,
        required: true,
    },
    contextid: {
        type: Number,
        required: true
    },
    element: {
        type: Object,
        required: false
    }
})

const emits = defineEmits(['hide', 'deleteElement'])
const test = ref(null)
const showTemplateDialog = ref(false)
const createTemplateDialogComponent = ref(null)

function deleteView(){
    emits('deleteElement')
}

function ShowTemplateDialog(){
    showTemplateDialog.value = true
    createTemplateDialogComponent.value.setView(props.element)
    
}

onMounted(() => {
    waitForElm('#' + props.targetId).then((el) => {
        el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        test.value.show(e)
    }, false)
    })
 
})

</script>

<style scoped lang="scss">
.development-context-bar{

}
</style>