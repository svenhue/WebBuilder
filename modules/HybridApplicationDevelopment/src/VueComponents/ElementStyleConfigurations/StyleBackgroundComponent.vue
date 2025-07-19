<template>
    <div class="sbc">
        <div :style="{position: 'relative'}">
            <div class="small-block-header">
                Image & Gradient
            </div>
            <div>
                <div v-for="background in backgrounds" :key="background">
                    {{  background }}
                </div>
            </div>
            <div :style="{position: 'absolute', top: '2px', right: '20px'}">
                <UIcon name="add" size="20px" @click="iAgVisibility = !iAgVisibility"></UIcon>
            </div>
            <div class="sb-settings" v-show="iAgVisibility == true" :style="{position: 'absolute'}">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div class="small-block-header">
                            Type
                            </div>
                        </td>
                        <td colspan="4">
                            <div :style="{display: 'inline-flex',alignItems: 'center'}">
                 
                            <div class="icon-wrapper">
                                <UIcon name="insert_photo" size="30px">

                                </UIcon>
                            </div>
                            <div class="icon-wrapper">
                                <UIcon name="gradient" size="30px">

                                </UIcon>
                            </div>
                            <div class="icon-wrapper">
                                <UIcon name="vignette" size="30px">

                                </UIcon>
                            </div>
                            <div class="icon-wrapper"> 
                                <UIcon name="texture" size="30px"></UIcon>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td>
                            <div class="small-block-header">
                            Image
                            </div>
                        </td>
                        <td>
                            <NuxtImg  width="80px" :src="currentFocussedBackground.image">
                            </NuxtImg>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td></td>
                        <td colspan="4">

                        <div>
                            <ButtonComponent dense> Choose Image</ButtonComponent>
                        </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td>    
                            <div class="small-block-header">
                                Size
                            </div>
                        </td>
                        <td colspan="4">
                            <div :style="{display:'inline-flex'}">
                                <ButtonComponent  :color="currentFocussedBackground.size == 'custom' ? darkgrey : brightgrey" dense >
                                    Custom
                                </ButtonComponent>
                                <ButtonComponent  :color="currentFocussedBackground.size == 'cover' ? darkgrey : brightgrey" dense >
                                    Cover
                                </ButtonComponent>
                                <ButtonComponent  :color="currentFocussedBackground.size == 'contain' ? darkgrey : brightgrey" dense >
                                    Contain
                                </ButtonComponent>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td>

                        </td>
                        <td>
                            <div :style="{display:'inline-flex'}">
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Width
                                        </div>
                                    </template>
                                </InputComponent>
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Height
                                        </div>
                                    </template>
                                  
                                </InputComponent>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td colspan="4">
                            <div :style="{display: 'inline-flex', marginTop: '10px'}">
                            <div class="small-block-header">
                                Position
                            </div>
                            <div>

                     
                            <div :style="{display:'inline-flex'}">
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Top
                                        </div>
                                    </template>
                                </InputComponent>
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Bottom
                                        </div>
                                    </template>
                                  
                                </InputComponent>
                            </div>
                            <div :style="{display:'inline-flex'}">
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Left
                                        </div>
                                    </template>
                                </InputComponent>
                                <InputComponent
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </SelectComponent>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Right
                                        </div>
                                    </template>
                                  
                                </InputComponent>
                            </div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td colspan="4">
                            <div :style="{display: 'inline-flex'}">
                                <div class="small-block-header">
                                    Fixed
                                </div>
                                <ButtonComponent dense :style="{width:'80px', height: '30px'}">
                                    Fixed
                                </ButtonComponent>

                                <ButtonComponent dense :style="{width:'120px', height: '30px'}">
                                    Not Fixed
                                </ButtonComponent>
                         </div>
                        </td>
                    </tr>

                    <tr v-show="currentFocussedBackground.type == 'linear-gradient'">
                        <td colspan="4">
                        <div :style="{display:'inline-flex', alignItems:'center'}">
                        <div class="small-block-header">
                            Angle
                        </div>
                        
                            <InputComponent 
                            :style="{width: '110px'}"
                            dense v-model="currentFocussedBackground.linearGradientAngle"
                            :rules="[val => val <= 360 && val >= 0 || 'Select a value between 0 and 360']">
                            <template v-slot:append>
                                <div :style="{fontSize:'small'}">
                                        Degree
                                </div>
                            </template>
                            </InputComponent>
                    </div>
                    <InputComponent
                        filled dense
                        v-model="styles.backgroundColor"
                        class="sbc-input"
                    >
                        <template v-slot:append>
                        <UIcon name="colorize" class="cursor-pointer">
                            <UPopover cover transition-show="scale" transition-hide="scale">
                            <UColorPicker v-model="currentFocussedBackground.linearGradientColor"></UColorPicker>
                            </UPopover>
                        </UIcon>
                        </template>
                    </InputComponent>
                </td>
                    </tr>
                </tbody>
                </table>
                
            </div>
        </div>
        <div :style="{display: 'inline-flex', alignItems: 'center'}">
            <div class="small-block-header">
                Color
            </div>
            <InputComponent
            
        filled dense
        v-model="styles.backgroundColor"
        class="sbc-input"
      >
        <template v-slot:append>
          <UIcon name="colorize" class="cursor-pointer">
            <UPopover cover transition-show="scale" transition-hide="scale">
              <UColorPicker v-model="styles.backgroundColor"></UColorPicker>
            </UPopover>
          </UIcon>
        </template>
      </InputComponent>
        </div>
    </div>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { ref, computed, reactive, inject } from 'vue';
import { colors } from 'quasar';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';


const darkgrey = colors.getPaletteColor('darkgrey')
const brightgrey = colors.getPaletteColor('brightgrey')
const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const styleManager = inject('styleManager_'+props.contextid) as StyleManagerViewModel
const styles = reactive({
    backgroundColor: '',
    background: '',
})
const iAgVisibility = ref(false);
const backgrounds = computed(() => {
    todo
    return styleManager.getViewBackgrounds();
})
var currentFocussedBackground = reactive({
    background: '',
    type: 'image',
    image: 'src/assets/developmenticons/image.svg',
    size: 'custom',
    width: '',
    widthUnit: '',
    height: '',
    heightUnit: '',
    linearGradientAngle: '',
    linearGradientColor: '',
})

</script>

<style scoped lang="scss">
 .sbc{
     background-color: theme('colors.brightgrey');
     .sb-settings{
         background-color: theme('colors.brightgrey');
         z-index: 2;
         width: 100%;
        
     }
     .sbc-input{
         background-color: theme('colors.brightgrey');
        
     }
 }
</style>