<template>
    <div class="stc">
        <table>
            <tbody>
            <tr>
                <td >
                    <div class="small-block-header">
                    Font
                </div>
                </td>
                <td colspan="4">
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense
                         :popup-content-style="{
                        backgroundColor: '#57595d'
                    }"
                    autocomplete="true"
                    use-input
                    new-value-mode="add"
              
                    :style="{width: '208px'}"
                    :options="styleManager.fonts"
                    v-model="styles.font"
                    @update:model-value="(v) => emits('updateElement', [{key: 'style.fontFamily', value: v}])"
                    >
    
                    </q-select>
                </td>
            </tr>
            <tr>
                <td >
                    <div class="small-block-header">
                    Weight
                </div>
                </td>
                <td colspan="4">
                    <q-input dense
                    autocomplete
                    use-input
                    class="stc-input"
                    :style="{width: '208px'}"
                    @update:model-value="(v) => emits('updateElement', [{key: 'style.fontWeight', value: v}])"
                    v-model="styles.fontWeight"
                    >
    
                    </q-input>
                </td>
            </tr>
            <tr>
                <td >
                    <div class="small-block-header">
                    Size
                </div>
                </td>
                <td colspan="1">
                    <q-input dense 
                    class="stc-input"
                    :style="{width: '75px', marginRight:'-10px'}"
                    v-model="styles.fontSize"
                    @update:model-value="(v) => emits('updateElement', [{key: 'style.fontSize', value: v + styles.fontSizeUnit}])"
                    >
                    <template v-slot:append>
                                <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" 
                                     :popup-content-style="{
                                    backgroundColor: '#57595d'
                                }"
                                dense 
                                hide-dropdown-icon
                                :style="{width: '25px'}"
                                v-model="styles.fontSizeUnit"
                                @update:model-value="(v) => emits('updateElement', [{key: 'style.fontSize', value: styles.fontSize + v}])"
                                :options="styleManager.sizeUnits">
                                </q-select>
                            </template>
                    </q-input>
                </td>
                <td>
                    <div class="small-block-header">
                        Height
                    </div>
                </td>
                <td>
                    <q-input dense 
                    class="stc-input"
                    :style="{width: '87px'}"
                    v-model="styles.lineHeight"
                    @update:model-value="(v) => emits('updateElement', [{key: 'style.lineHeight', value: v + styles.lineHeightUnit}])"
                    >
                    <template v-slot:append>
                                <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense 
                                :popup-content-style="{
                                    backgroundColor: '#57595d'
                                }"
                                hide-dropdown-icon
                                :style="{width: '25px'}"
                                v-model="styles.lineHeightUnit"
                                @update:model-value="(v) => emits('updateElement', [{key: 'style.lineHeight', value: styles.lineHeight + v}])"
                                :options="styleManager.sizeUnits">

                                </q-select>
                            </template>
                    </q-input>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="small-block-header">
                        Color
                    </div>
                </td>
                <td colspan="4">
                    <q-input
                    :style="{width: '208px'}"
                        filled dense
                        v-model="styles.color"
                        class="stc-input"
                        @update:model-value="(v) => emits('updateElement', [{key: 'style.color', value: v}])"
                    >
                        <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-color v-model="styles.color"></q-color>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="small-block-header">
                        Align
                    </div>
                </td>
                <td colspan="4">
                    <div :style="{display: 'inline-flex'}">
                        <q-btn dense unelevated
                            icon="format_align_left"
                            text-color="white" 
                            :class="styles.textAlign == 'left' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextAlign('left')">
                                    
                        </q-btn>
                        <q-btn dense unelevated
                            icon="format_align_center"
                            text-color="white" 
                            :class="styles.textAlign == 'center' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextAlign('center')">
                                    
                        </q-btn>
                        <q-btn dense unelevated
                            icon="format_align_right"
                            text-color="white" 
                            :class="styles.textAlign == 'right' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextAlign('right')">
                                    
                        </q-btn>
                        <q-btn dense unelevated
                            icon="format_align_justify"
                            text-color="white" 
                            :class="styles.textAlign == 'justify' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextAlign('justify')">
                                    
                        </q-btn>
                    </div>
                </td>
                </tr>
                <tr>
                    <td>
                        <div class="small-block-header">
                            Style
                        </div>
                    </td>
                    <td colspan="4">
                        <div :style="{display: 'inline-flex'}">
                            <q-btn dense unelevated
                            icon="format_italic"
                            text-color="white" 
                            :class="styles.fontStyle == 'italic' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextStyle('italic')">   
                            </q-btn>
                            <q-btn dense unelevated
                            icon="close"
                            text-color="white" 
                            :class="styles.fontStyle == 'none' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextStyle('none')">   
                            </q-btn>
                            <q-btn dense unelevated
                            icon="format_strikethrough"
                            text-color="white" 
                            :class="styles.fontStyle == 'strikethrough' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextStyle('strikethrough')">   
                            </q-btn>
                            <q-btn dense unelevated
                            icon="format_underlined"
                            text-color="white" 
                            :class="styles.fontStyle == 'underline' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextStyle('underline')">   
                            </q-btn>
                            <q-btn dense unelevated
                            icon="format_overline"
                            text-color="white" 
                            :class="styles.fontStyle == 'overline' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'overline', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateTextStyle('underline')">   
                            </q-btn>
                        </div>
                    </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import { ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';

const emits = defineEmits(['updateElement'])

defineExpose({
    setStylesFromElement
})

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const styleManager = inject('styleManager_'+props.contextid) as StyleManagerViewModel
function updateTextAlign(value: string){
    if(value = styles.textAlign){
        styles.textAlign = ''
        emits('updateElement', [{key: 'style.textAlign', value: ''}])
        return;
    }
    styles.textAlign = value
    emits('updateElement', [{key: 'style.textAlign', value: value}])
}
function updateTextStyle(value: string){
    if(styles.fontStyle == value){
        styles.fontStyle = ''
        emits('updateElement', [{key: 'style.fontStyle', value: ''}])
        return;
    }
    styles.fontStyle = value
    emits('updateElement', [{key: 'style.fontStyle', value: value}])
}
function setStylesFromElement(view: ViewElement){
    if(view == undefined){
        return;
    }
    styles.font = view.style?.fontFamily ?? ''
    styles.fontWeight = view.style?.fontWeight ?? ''
    styles.fontSize = view.style?.fontSize?.match(/\d+/)[0] ? view.style?.fontSize?.match(/\d+/)[0] : ''
    styles.fontSizeUnit =  view.style?.fontSize?.match(/[a-z]+/)[0] ? view.style?.fontSize?.match(/[a-z]+/)[0] : ''  
    styles.lineHeight = view.style?.lineHeight?.match(/\d+/)[0] ? view.style?.lineHeight?.match(/\d+/)[0] : ''
    styles.lineHeightUnit = view.style?.lineHeight?.match(/[a-z]+/)[0] ? view.style?.lineHeight?.match(/[a-z]+/)[0] : ''
    styles.color = view.style?.color ?? ''
    styles.textAlign = view.style?.textAlign ?? ''
    styles.fontStyle = view.style?.fontStyle ?? ''

}
const styles = reactive({
    font: '',
    fontWeight: '',
    fontSize: '',
    fontSizeUnit: '-',
    lineHeight: '',
    lineHeightUnit: '-',
    color: '',
    textAlign: '',
    fontStyle: '',

})
</script>

<style scoped lang="scss">
 .stc{
     background-color: theme('colors.brightgrey');
     width:100%;
     display:table;
     .stc-input{
         background-color: theme('colors.darkgrey');
     }
 }
</style>