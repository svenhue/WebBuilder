<template>
    <div class="development-context-bar">
        <div  context-menu  @hide="emits('hide')" class="development-context-bar" ref="test" auto-close   touch-position>
            <div class="development-context-bar" dense>
                <div dense clickable @click="deleteView()">
                    <div-section>
                        <div-label>Delete View</div-label>
                    </div-section>
                </div>
                <div disable clickable @click="() => ShowTemplateDialog()">
                    <div-section>
                        <div-label>Save as template (Coming Soon)</div-label>
                    </div-section>
                </div>
            </div>
        </div>

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
    background-color: theme('colors.darkgrey');
    color:white;
}
</style>