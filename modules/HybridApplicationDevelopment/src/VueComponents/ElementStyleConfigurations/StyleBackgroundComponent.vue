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
                <q-icon name="add" size="20px" @click="iAgVisibility = !iAgVisibility"></q-icon>
            </div>
            <div class="sb-settings" v-show="iAgVisibility == true" :style="{position: 'absolute'}">
                <table>
                    <tr>
                        <td>
                            <div class="small-block-header">
                            Type
                            </div>
                        </td>
                        <td colspan="4">
                            <div :style="{display: 'inline-flex',alignItems: 'center'}">
                 
                            <div class="icon-wrapper">
                                <q-icon name="insert_photo" size="30px">

                                </q-icon>
                            </div>
                            <div class="icon-wrapper">
                                <q-icon name="gradient" size="30px">

                                </q-icon>
                            </div>
                            <div class="icon-wrapper">
                                <q-icon name="vignette" size="30px">

                                </q-icon>
                            </div>
                            <div class="icon-wrapper"> 
                                <q-icon name="texture" size="30px"></q-icon>
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
                            <q-img  width="80px" :src="currentFocussedBackground.image">
                            </q-img>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td></td>
                        <td colspan="4">

                        <div>
                            <q-btn dense> Choose Image</q-btn>
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
                                <q-btn  :color="currentFocussedBackground.size == 'custom' ? darkgrey : brightgrey" dense >
                                    Custom
                                </q-btn>
                                <q-btn  :color="currentFocussedBackground.size == 'cover' ? darkgrey : brightgrey" dense >
                                    Cover
                                </q-btn>
                                <q-btn  :color="currentFocussedBackground.size == 'contain' ? darkgrey : brightgrey" dense >
                                    Contain
                                </q-btn>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="currentFocussedBackground.type == 'image'">
                        <td>

                        </td>
                        <td>
                            <div :style="{display:'inline-flex'}">
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Width
                                        </div>
                                    </template>
                                </q-input>
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Height
                                        </div>
                                    </template>
                                  
                                </q-input>
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
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Top
                                        </div>
                                    </template>
                                </q-input>
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Bottom
                                        </div>
                                    </template>
                                  
                                </q-input>
                            </div>
                            <div :style="{display:'inline-flex'}">
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Left
                                        </div>
                                    </template>
                                </q-input>
                                <q-input
                                dense
                                bottom-slots
                                v-model="currentFocussedBackground.width">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentFocussedBackground.widthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                    <template v-slot:hint>
                                        <div :style="{width: '100%', display: 'inline-flex', alignItems:'center', justifyContent:'center'}">
                                            Right
                                        </div>
                                    </template>
                                  
                                </q-input>
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
                                <q-btn dense :style="{width:'80px', height: '30px'}">
                                    Fixed
                                </q-btn>

                                <q-btn dense :style="{width:'120px', height: '30px'}">
                                    Not Fixed
                                </q-btn>
                         </div>
                        </td>
                    </tr>

                    <tr v-show="currentFocussedBackground.type == 'linear-gradient'">
                        <td colspan="4">
                        <div :style="{display:'inline-flex', alignItems:'center'}">
                        <div class="small-block-header">
                            Angle
                        </div>
                        
                            <q-input 
                            :style="{width: '110px'}"
                            dense v-model="currentFocussedBackground.linearGradientAngle"
                            :rules="[val => val <= 360 && val >= 0 || 'Select a value between 0 and 360']">
                            <template v-slot:append>
                                <div :style="{fontSize:'small'}">
                                        Degree
                                </div>
                            </template>
                            </q-input>
                    </div>
                    <q-input
                        filled dense
                        v-model="styles.backgroundColor"
                        class="sbc-input"
                    >
                        <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-color v-model="currentFocussedBackground.linearGradientColor"></q-color>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>
                </td>
                    </tr>
                </table>
                
            </div>
        </div>
        <div :style="{display: 'inline-flex', alignItems: 'center'}">
            <div class="small-block-header">
                Color
            </div>
            <q-input
            
        filled dense
        v-model="styles.backgroundColor"
        class="sbc-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="styles.backgroundColor"></q-color>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
        </div>
    </div>
</template>

<script setup lang="ts">
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