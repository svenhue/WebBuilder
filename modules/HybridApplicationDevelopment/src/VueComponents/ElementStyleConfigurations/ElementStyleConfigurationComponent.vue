<template>
    <div class="escc">
        <q-list dense>
            <q-expansion-item
            dense
            :expand
            :expand-icon-class="'expand-icon-class'"
            label="Colors">
                <StyleColorEditorComponent
                :contextid="contextid"
                ref="colorEditor"
                @updateElement="updateFocussedElement">
                </StyleColorEditorComponent>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Spacing">
            <div :style="{display: 'flex', justifyContent: 'center'}">
                <StyleSpacingEditorComponent
                :contextid="contextid"
                ref="spacingEditor"
                @updateElement="updateFocussedElement"
                >
                </StyleSpacingEditorComponent>
            </div>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Layout">
                <StyleLayoutEditorComponent
                :contextid="contextid"
                ref="layoutEditor"
                @updateElement="updateFocussedElement">
                </StyleLayoutEditorComponent>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Spacing">
            <div :style="{display: 'flex', justifyContent: 'center'}">
                <StyleSpacingEditorComponent
                :contextid="contextid"
                ref="spacingEditor"
                @updateElement="updateFocussedElement"
                >
                </StyleSpacingEditorComponent>
            </div>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Size">
                <StyleSizeEditorComponent
                :contextid="contextid"
                ref="sizeEditor"
                @updateElement="updateFocussedElement">
                </StyleSizeEditorComponent>
                </q-expansion-item>
            <q-expansion-item
            dense
            label="Position">
                <StylePositionEditorComponent
                :contextid="contextid"
                @updateElement="updateFocussedElement"
                ref="positionEditor">
                </StylePositionEditorComponent>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Typography">
                <StyleTypographyComponent
                :contextid="contextid"
                ref="typographyEditor"
                @updateElement="updateFocussedElement">
                </StyleTypographyComponent>
            </q-expansion-item>
            <q-expansion-item
            dense
            label="Borders">
            <StyleBordersEditorComponent
            :contextid="contextid"
            ref="bordersEditor"
           @updateElement="updateFocussedElement">

            </StyleBordersEditorComponent>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import { ref,ComputedRef } from 'vue';
import StyleLayoutEditorComponent from './StyleLayoutEditorComponent.vue';
import StyleSpacingEditorComponent from './StyleSpacingEditorComponent.vue';
import StyleSizeEditorComponent from './StyleSizeEditorComponent.vue';
import StylePositionEditorComponent from './StylePositionEditorComponent.vue';
import StyleTypographyComponent from './StyleTypographyComponent.vue';
import StyleBordersEditorComponent from './StyleBordersEditorComponent.vue';
import { updateValue } from 'alphautils';
import { waitForElm } from 'alphautils';
import StyleColorEditorComponent from './StyleColorEditorComponent.vue';

defineProps({
    currentElement: {
        type: Object as () => ComputedRef<IViewConfiguration>,
        required: true
    },
    contextid: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['updateelement'])
const sizeEditor = ref(null)
const positionEditor = ref(null)
const spacingEditor = ref(null)
const layoutEditor = ref(null)
const typographyEditor = ref(null)
const bordersEditor = ref(null)
const colorEditor = ref(null)


waitForElm('[id^="developmentcomponent"]').then(() => {
    // we need to wait for the RuntimeViewModel to get the focussed element 
})


function updateFocussedElement(values: Array<updateValue>){
    emits('updateelement', values);
}
function SetElement(view: IViewConfiguration){
    if(view?.id != undefined){
        sizeEditor.value?.setStylesFromElement(view)
        positionEditor.value?.setStylesFromElement(view)
        spacingEditor.value?.setStylesFromElement(view)
        layoutEditor.value?.setStylesFromElement(view)
        typographyEditor.value?.setStylesFromElement(view)
        bordersEditor.value?.setStylesFromElement(view)
        colorEditor.value?.setStylesFromElement(view)
    }
}

defineExpose({
    SetElement
})
</script>

<style scoped lang="scss">
 .escc{
     color: theme('colors.fontwhite');
     background-color: theme('colors.primary-dark');
     width:100%;
     padding-left: 10px;

     .expand-icon-class{
        background-color: 'red'
     }
 }

</style>