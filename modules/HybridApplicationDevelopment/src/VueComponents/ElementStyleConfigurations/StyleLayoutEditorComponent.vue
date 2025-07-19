<template>
    <div class="style-layout-editor">
    <table>
        <tbody>
            <tr>
                <td>
        <div class="small-block-header">
            Display
        </div>
    </td>
    <td>
        <ButtonComponent dense unelevated 
        :class="styles.display == 'block' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'
            }" 
        @click="displayIsBlock = !displayIsBlock,   updateDisplay(displayIsBlock == true ? 'block' : '')"
        v-model="displayIsBlock">
                <NuxtImg width="20px" height="20px" src="/icons/developmenticons/blockdisplay.svg" color="white">
                    <UTooltip>
                        Block
                    </UTooltip>
                </NuxtImg>
        </ButtonComponent>
    </td> 
    <td>   
        <ButtonComponent dense unelevated 
        :class="styles.display == 'flex' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
        @click="displayIsFlex = !displayIsFlex,   updateDisplay(displayIsFlex == true ? 'flex' : '')"
        v-model="displayIsFlex">
                <NuxtImg width="20px" height="20px" src="/icons/developmenticons/flexlayout.svg">
                    <UTooltip>
                        Flex
                    </UTooltip>
                </NuxtImg>
        </ButtonComponent>
    </td>
    <td>    
        <ButtonComponent dense unelevated 
        :class="styles.display == 'grid' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
        @click="displayIsGrid = !displayIsGrid,   updateDisplay(displayIsGrid == true ? 'grid' : '')"
        v-model="displayIsGrid">
                <NuxtImg width="20px" height="20px" src="/icons/developmenticons/GridLayout.svg">
                    <UTooltip>
                        Grid
                    </UTooltip>
                </NuxtImg>
        </ButtonComponent>
    </td>
    <td>
        <ButtonComponent dense unelevated 
        :class="styles.display == 'inline-block' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
        @click="displayIsInlineBlock = !displayIsInlineBlock,   updateDisplay(displayIsInlineBlock == true ? 'inline-block' : '')"
        v-model="displayIsInlineBlock">
                <NuxtImg width="20px" height="20px" src="/icons/developmenticons/inlineblockdisplay.svg">
                    <UTooltip>
                        Inline Block
                    </UTooltip>
                </NuxtImg>
        </ButtonComponent>

    </td>
    <td>
    <ButtonComponent dense unelevated 
        :class="styles.display == 'inline' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
        @click="displayIsInline = !displayIsInline,   updateDisplay(displayIsInline == true ? 'inline' : '')"
        v-model="displayIsInline">
                <NuxtImg width="20px" height="20px" src="/icons/developmenticons/inlinedisplay.svg">
                    <UTooltip>
                        Inline Flex
                    </UTooltip>
                </NuxtImg>
        </ButtonComponent>
        
    </td>
    <td>
        <ButtonComponent dense unelevated 
        icon="visibility_off"
        
        :class="styles.display == 'none' ? 'c-darkgrey' : 'c-brightgrey'"
        :style="{
            display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
        @click="displayIsNone = !displayIsNone,   updateDisplay(displayIsNone == true ? 'none' : '')"
        v-model="displayIsNone">

        </ButtonComponent>
    </td>
    </tr>
</tbody>
        </table>
        
        <div v-show="styles.display == 'flex'" class="edit-flex-layout">
            <table>
                <tbody>
                <tr>
                    <td>
                        <div class="small-block-header">
                        Direction
                        </div>
                       
                    </td>
                    <td>
                        <ButtonComponent dense unelevated  label="Horizontal"
                            text-color="white"
                            :class="styles.flexDirection == 'row' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="changeFlexDirection('row')"
                            v-model="flexDirectionIsHorizontal">

                            </ButtonComponent>
                    </td>
                    <td>
                        
                        <ButtonComponent dense unelevated  label="Vertical"
                        text-color="white"
                            :class="styles.flexDirection == 'column' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="changeFlexDirection('column')"
                            v-model="flexDirectionIsVertical">

                            </ButtonComponent>
                    </td>
                </tr>
            </tbody>
            </table>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div class="small-block-header">
                        Align
                        </div>
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :icon="flexDirectionIsHorizontal == true ? 'align_vertical_top' : 'align_horizontal_left'"
                            :class="styles.alignContent == 'start' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlign('start')">
                        </ButtonComponent>
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :icon="flexDirectionIsHorizontal == true ? 'align_vertical_center' : 'align_horizontal_center'"
                            :class="styles.alignContent == 'center' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlign('center')">
                        </ButtonComponent>
                    </td>

                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :icon="flexDirectionIsHorizontal == true ? 'align_vertical_bottom' : 'align_horizontal_right'"
                            :class="styles.alignContent == 'end' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlign('end')">
                        </ButtonComponent>
                    </td>

                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :icon="flexDirectionIsHorizontal == false ?'horizontal_distribute' : 'vertical_distribute'"
                            :class="styles.alignContent == 'stretch' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlign('stretch')">
                        </ButtonComponent>
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignContent == 'baseline' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlign('baseline')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="flexDirectionIsHorizontal == false ? '/icons/developmenticons/align_horizontal_center.svg' : '/icons/developmenticons/align_vertical_center.svg' ">
                        </NuxtImg>
                        </ButtonComponent>
                       
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="small-block-header">
                        Justify
                        </div>
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.justifyContent == 'start' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexJustify('start')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == false ? 
                            '/icons/developmenticons/align_justify_flex_start.svg' : '/icons/developmenticons/align_start.svg' ">
                            </NuxtImg>
                        </ButtonComponent>
                       
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.justifyContent == 'center' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexJustify('center')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == false ? 
                            '/icons/developmenticons/align_justify_center.svg' : '/icons/developmenticons/align_center.svg' ">
                            </NuxtImg>
                        </ButtonComponent>
                    </td>

                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.justifyContent == 'end' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexJustify('end')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == false ? 
                            '/icons/developmenticons/align_justify_flex_end.svg' : '/icons/developmenticons/align_end.svg' ">
                            </NuxtImg>
                        </ButtonComponent>
                    </td>

                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.justifyContent == 'space-between' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexJustify('space-between')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == false ? 
                            '/icons/developmenticons/align_justify_space_around.svg' : '/icons/developmenticons/align_space_between.svg' ">
                            </NuxtImg>
                        </ButtonComponent>
                    </td>
                    <td>
                        <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.justifyContent == 'space-around' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexJustify('space-around')">
                            <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == false ? 
                            '/icons/developmenticons/align_justify_space_even.svg' : '/icons/developmenticons/align_space_around.svg' ">
                            </NuxtImg>
                        </ButtonComponent>
                    </td>
                </tr>
                <tr>
                    <td >
                        <div class="small-block-header">
                        Gap
                        </div>

                        </td>
                        <td colspan="3">
                        <InputComponent
                        v-model="styles.columnGap" 
                        @update:model-value="(v) =>  {emits('updateElement', [{key: 'style.columnGap', value: v + styles.columnGapUnit}]), styles.columnGap = v}"
                        hide-bottom-space bottom-slots :dense="true" >
                            <template v-slot:hint>
                                Columns
                            </template>
                            <template v-slot:append>
                                <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                @update:model-value="(v) =>  {emits('updateElement', [{key: 'style.columnGap', value: styles.columnGap +v }]), styles.columnGapUnit = v}"
                                v-model="styles.rowGapUnit"
                                :options="styleManager.sizeUnits">

                                </SelectComponent>
                            </template>
                        </InputComponent>
                    </td>
                    <td colspan="3">
                        <InputComponent  hide-bottom-space bottom-slots :dense="true" 
                        v-model="styles.rowGap"
                        @update:model-value="(v) =>  {emits('updateElement', [{key: 'style.rowGap', value: v + styles.rowGapUnit}]), styles.rowGap = v} ">
                            <template v-slot:hint>
                                Rows
                            </template>
                            <template v-slot:append>
                                <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                @update:model-value="(v) =>  {emits('updateElement', [{key: 'style.rowGap', value: styles.rowGap + v }]), styles.rowGapUnit = v}"

                                v-model="styles.rowGapUnit"
                                :options="styleManager.sizeUnits">

                                </SelectComponent>
                            </template>
                        </InputComponent>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="small-block-header">
                        Children
                        </div>
                    </td>
                    <td colspan="6">
                        <ButtonComponent dense unelevated  label="Don't Wrap"
                                text-color="white"
                                :class="wrapChildren == false ? 'c-darkgrey' : 'c-brightgrey'"
                                :style="{
                                    width:'98px',
                                    display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                                @click="wrapChildren = false,  styles.alignItems = '', emits('updateElement', [{key: 'style.alignItems', value: 'normal'}])"
                            >

                            </ButtonComponent>
                            <ButtonComponent dense unelevated  label="Wrap"
                                text-color="white"
                                :class="wrapChildren == true ? 'c-darkgrey' : 'c-brightgrey'"
                                :style="{
                                    width:'98px',
                                    display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                                @click="wrapChildren = true "
                            >

                            </ButtonComponent>
                    </td>

                </tr>
                <tr v-show="wrapChildren == true">
                    <td colspan="6">
                        <div :style="{display:'inline-flex'}">
                            <div class="small-block-header">

                            Align
                            </div>
                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'start' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('start')">
                                <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_justify_flex_start.svg' 
                                    : '/icons/developmenticons/align_rows_start.svg' ">
                                </NuxtImg>
                            </ButtonComponent>

                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'center' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('center')">
                                <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_justify_center.svg' 
                                    : '/icons/developmenticons/align_rows_center.svg' ">
                                </NuxtImg>
                            </ButtonComponent>
                            
                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'end' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('end')">
                                <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_end.svg' 
                                    : '/icons/developmenticons/align_rows_end.svg' ">
                                </NuxtImg>
                            </ButtonComponent>
                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'stretch' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('stretch')">
                                <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_justify_stretch.svg' 
                            : '/icons/developmenticons/align_rows_items_stretch.svg' ">
                                </NuxtImg>
                            </ButtonComponent>
                            
                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'space-between' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('space-between')">
                                <NuxtImg  width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_justify_space_between.svg' 
                            : '/icons/developmenticons/align_rows_space_between.svg' ">
                                </NuxtImg>
                            </ButtonComponent>
                            <ButtonComponent dense unelevated 
                            text-color="white"
                            :class="styles.alignItems == 'space-around' ? 'c-darkgrey' : 'c-brightgrey'"
                            @click="changeFlexAlignItems('space-around')">
                                <NuxtImg 
                                @click="changeFlexAlignItems('space-around')"
                                width="25px"  color="white" clickable  class="sle-img" :src="isDirectionVertical == true ? 
                                '/icons/developmenticons/align_columns_justify_space_around.svg' 
                            : '/icons/developmenticons/align_rows_space_around.svg' ">
                                </NuxtImg>
                            </ButtonComponent>
                        </div>
                    </td>

                </tr>
            </tbody>
            </table>
            
        </div>
    </div>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { ref, computed, reactive, inject, toValue } from 'vue';
import { ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';
//todo better solution for handling the icons the are logically part of this package, not the appskeleton
const props = defineProps({
    contextid:{
        type: Number,
        required:true
    }
})
const styleManager = inject('styleManager_'+ props.contextid) as StyleManagerViewModel

const emits = defineEmits(['updateElement'])

defineExpose({
    setStylesFromElement
})

function setStylesFromElement(view: ViewElement){
    if(view.value == undefined){
        return;
    }
    view = toValue(view)
    styles.display = view.style?.display ?? '';
    styles.flexDirection = view.style?.flexDirection ?? '';
    styles.flexWrap = view.style?.flexWrap ?? '';
    styles.justifyContent = view.style?.justifyContent ?? '';
    styles.alignItems = view.style?.alignItems ?? '';
    styles.alignContent = view.style?.alignContent ?? '';
    styles.columnGap = view.style?.columnGap?.match(/\d+/)[0] ?? '';
    styles.rowGap = view.style?.rowGap?.match(/\d+/)[0] ?? '';
    styles.rowGapUnit = view.style?.rowGap?.match(/[a-zA-Z]+/)[0] ?? '';
    styles.columnGapUnit = view.style?.columnGap?.match(/[a-zA-Z]+/)[0] ?? '';

}

const styles = reactive({
    display: '',
    flexDirection: '',
    flexWrap: '',
    justifyContent: '',
    alignItems: '',
    alignContent: '',
    columnGap: '',
    rowGap: '',
    rowGapUnit: 'px',
    columnGapUnit: 'px'
})

const isDirectionVertical = computed(() => {
    return styles.flexDirection === 'column' ? true : false;
});

const displayIsBlock = ref(false)
const displayIsFlex = ref(false)
const displayIsGrid = ref(false)
const displayIsInlineBlock = ref(false)
const displayIsInline = ref(false)
const displayIsNone = ref(false)
const flexDirectionIsVertical = ref(false)
const flexDirectionIsHorizontal = ref(false)
const wrapChildren = ref(false)


function changeFlexAlignItems(value: string){
    if(styles.alignItems == value){
        styles.alignItems = '';
        emits('updateElement', [{key: 'style.alignItems', value: ''}])
        return;
    }
    styles.alignItems = value;
    emits('updateElement', [{key: 'style.alignItems', value: value}])
}

function changeFlexAlign(string: string){
    if(styles.alignContent == string){
        styles.alignContent = '';
        emits('updateElement', [{key: 'style.alignItems', value: ''}])
        return;
    }

    styles.alignContent = string;
    emits('updateElement', [{key: 'style.alignItems', value: string}])
}

function changeFlexJustify(string: string){
    if(styles.justifyContent == string){
        styles.justifyContent = '';
        emits('updateElement', [{key: 'style.justifyContent', value: ''}])
        return;
    }
    styles.justifyContent = string;
    emits('updateElement', [{key: 'style.justifyContent', value: string}])
}

function changeFlexDirection(value: string){
    
    switch(value){
        case('row'):
            if(styles.flexDirection == 'row'){
                flexDirectionIsHorizontal.value = false;
                flexDirectionIsVertical.value = true;
                styles.flexDirection = 'column';
                break;
            }

            flexDirectionIsHorizontal.value = true;
            flexDirectionIsVertical.value = false;
            styles.flexDirection = value;

            break;
        case('column'):

            if(styles.flexDirection == 'column'){
                flexDirectionIsHorizontal.value = true;
                flexDirectionIsVertical.value = false;
                styles.flexDirection = 'row';
                break;
            }    

            flexDirectionIsHorizontal.value = false;
            flexDirectionIsVertical.value = true;
            styles.flexDirection = value;

            break;
    }

    emits('updateElement', [{key: 'style.flexDirection', value: styles.flexDirection}])
}

function updateDisplay(display: string){
    styles.display = display;

    switch(display){

        case('block'):
            displayIsBlock.value = true;
            displayIsFlex.value = false;
            displayIsGrid.value = false;
            displayIsInlineBlock.value = false;
            displayIsInline.value = false;
            displayIsNone.value = false;
            break;
        case('flex'):
            displayIsBlock.value = false;
            displayIsFlex.value = true;
            displayIsGrid.value = false;
            displayIsInlineBlock.value = false;
            displayIsInline.value = false;
            displayIsNone.value = false;
            break;
        case('grid'):
            displayIsBlock.value = false;
            displayIsFlex.value = false;
            displayIsGrid.value = true;
            displayIsInlineBlock.value = false;
            displayIsInline.value = false;
            displayIsNone.value = false;
            break;
        case('inline-block'):
            displayIsBlock.value = false;
            displayIsFlex.value = false;
            displayIsGrid.value = false;
            displayIsInlineBlock.value = true;
            displayIsInline.value = false;
            displayIsNone.value = false;
            break;
        case('inline'):
            displayIsBlock.value = false;
            displayIsFlex.value = false;
            displayIsGrid.value = false;
            displayIsInlineBlock.value = false;
            displayIsInline.value = true;
            displayIsNone.value = false;
            break;
        case('none'):
            displayIsBlock.value = false;
            displayIsFlex.value = false;
            displayIsGrid.value = false;
            displayIsInlineBlock.value = false;
            displayIsInline.value = false;
            displayIsNone.value = true;
            break;
    }
    emits('updateElement', [{key: 'style.display', value: styles.display}])
    
}

</script>

<style scoped lang="scss">
 .style-layout-editor{
     background-color: theme('colors.brightgrey');
     width:100%;
     .sle-img{
        margin-right:4px;
     }
 }

</style>