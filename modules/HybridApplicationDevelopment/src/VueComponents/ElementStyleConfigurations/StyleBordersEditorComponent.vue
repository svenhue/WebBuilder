<template>
    <div class="sbec">
        <div :style="{border: '1px solid black', borderRadius: '10px', padding: '10px', margin: '10px'}">
            <div :style="{display:'inline-flex'}">
                <div class="small-block-header">
                    Radius
                </div>
            </div>
            <br/>
            <div :style="{display:'inline-flex', alignItems: 'center'}">
          
                <InputComponent
                    dense
                    :style="{width: '130px'}"
                    class="alpha-input"
                    @update:model-value="(v) => updateBorderRadius('borderRadius', v)"
                    v-model="styles.borderRadiusAll">
                        <template v-slot:before>
                            <div class="alpha-input-label-before" :style="{width: '83px'}">
                            All
                            </div>
                        </template>
                    </InputComponent>
            </div>
            <div v-show="allCorners == false">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <InputComponent
                            class="alpha-input"
                                    dense
                                
                                    @update:model-value="(v) => updateBorderRadius('borderTopLeftRadius', v)"
                                    v-model="styles.borderRadiusTopLeft">
                                    <template v-slot:before>
                                        <div class="alpha-input-label-before" :style="{width: '80px'}">
                                        Top Left
                                        </div>
                                    </template>
                                    </InputComponent>
                        </td>
                        <td>
                            <InputComponent
                             class="alpha-input"
                                    dense
                                  
                                    @update:model-value="(v) => updateBorderRadius('borderRadius', v)"
                                    v-model="styles.borderRadiusTopRight">
                                <template v-slot:before>
                                    <div class="alpha-input-label-before" :style="{width: '80px'}">
                                    Top Right
                                    </div>
                                </template>
                            </InputComponent>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <InputComponent
                            dense
                            class="alpha-input"
                                    @update:model-value="(v) => updateBorderRadius('borderRadius', v)"
                                    v-model="styles.borderRadiusBottomLeft">
                            <template v-slot:before>
                                <div class="alpha-input-label-before" :style="{width: '80px'}">
                                Bottom Left
                                </div>
                            </template>
                            </InputComponent>
                        </td>
                        <td>
                            <InputComponent
                            class="alpha-input"
                            dense
                        
                            @update:model-value="(v) => updateBorderRadius('borderRadius', v)"
                            v-model="styles.borderRadiusBottomRight">
                            
                            <template v-slot:before>
                                <div class="alpha-input-label-before" :style="{width: '80px'}">
                                Bottom Right
                                </div>
                            </template>
                            </InputComponent>
                        </td>
                    </tr>
                </tbody>
                </table>
        </div>
            </div>
            <div :style="{border: '1px solid black', borderRadius: '10px', margin: '10px'}">
                <div class="small-block-header">
                    Borders
                </div>
                <div :style="{paddingLeft: '15px',paddingTop: '15px', display:'inline-flex'}">
                <div :style="{width: '50px',  height: '90px', position: 'relative'}">
                    <UIcon @click="focusBorder('All')"  :class="currentEditingBorder == 'All' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_outer" size="25px" :style="{position:'absolute', left:'32.5px', top:'32.5px'}" />
                    <UIcon @click="focusBorder('Left')" :class="currentEditingBorder == 'Left' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_left" size="25px" :style="{position:'absolute', left:'0px', top:'32.5px'}" />
                    <UIcon @click="focusBorder('Right')" :class="currentEditingBorder == 'Right' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_right" size="25px" :style="{position:'absolute', left:'63px', top:'32.5px'}"/>
                    <UIcon @click="focusBorder('Top')" :class="currentEditingBorder == 'Top' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_top" size="25px" :style="{position:'absolute', left:'32.5px', top:'0px'}"/>
                    <UIcon @click="focusBorder('Bottom')" :class="currentEditingBorder == 'Bottom' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_bottom" size="25px" :style="{position:'absolute', left:'32.5px', bottom:'0px'}"/>
                </div>
                <div :style="{marginLeft: '60px'}">
                        
                    <InputComponent dense
                    class="alpha-input"
                    :style="{width: '150px'}"
                    @update:model-value="(v: string) => updateBorder(v)"
                    v-model="styles.border"
                    >
                    <template v-slot:before>
                            <div class="alpha-input-label-before" >
                            Border
                            </div>
                    </template>
                    </InputComponent>          
                    <div :style="{display: 'inline-flex', alignItems: 'center'}">
                        <div :style="{paddingRight: '13px'}">
                            Style
                        </div>
                        <q-select class="alpha-select"
                        :popup-content-class="'alpha-dropdown-content'" dense
                        :popup-content-style="{
                            backgroundColor: '#57595d'
                        }"
                        :style="{width: '106px'}"
                        @update:model-value="(v) => updateSpecificBorder('Style', v)"
                        :options="styleManager.borderStyles"
                        v-model="currentBorderStyle"
                        >
                        </q-select>
                    </div>
                    <InputComponent
                    class="alpha-input"
                    :style="{width: '150px'}"
                    dense
                    @update:model-value="(v) => updateSpecificBorder('Width', v)"
                    v-model="currentBorderWidth">
                    <template v-slot:before>
                        <div class="alpha-input-label-before" :style="{paddingRight: '5px'}">
                        Width
                        </div>
                    </template>
                    </InputComponent>             
                         
                    <InputComponent
                    class="alpha-input"
                    dense
                    @update:model-value="(v) => updateSpecificBorder('Color', v)"
                    v-model="currentBorderColor"
                    :style="{width: '150px'}"
                    >
                        <template v-slot:before>
                            <div class="alpha-input-label-before" :style="{paddingRight: '6px'}">
                            Color
                            </div>
                        </template>
                        <template v-slot:append>
                            <UIcon  name="colorize" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-color :style="{backgroundColor: 'red'}" v-model="currentBorderColor" @update:model-value="(v) => updateSpecificBorder('Color', v)"></q-color>
                                </q-popup-proxy>
                            </UIcon>
                        </template>
                    </InputComponent>
                    </div>
                
                </div>
            </div>
    
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

import { ref, reactive, inject } from 'vue';
import { ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const styleManager = inject('styleManager_'+props.contextid) as StyleManagerViewModel
const allCorners = ref(false)
const currentEditingBorder = ref('')
const currentBorderStyle = ref('')
const currentBorderWidth = ref('')
const currentBorderColor = ref('')


const styles = reactive({
    borderRadiusAll: '',

    borderRadiusTopLeft: '',

    borderRadiusTopRight: '',

    borderRadiusBottomLeft: '',

    borderRadiusBottomRight: '',


    borderLeft: '',

    borderRight: '',

    borderTop: '',

    borderBottom: '',

    borderStyleAll: '',
    borderStyleLeft: '',
    borderStyleRight: '',
    borderStyleTop: '',
    borderStyleBottom: '',
    borderWidthAll: '',
    borderWidthLeft: '',
    borderWidthRight: '',
    borderWidthTop: '',
    borderWidthBottom: '',
    borderColorAll: '',
    borderColorLeft: '',
    borderColorRight: '',
    borderColorTop: '',
    borderColorBottom: '',
    border: ''

})

const emits = defineEmits(['updateElement'])

defineExpose({
    setStylesFromElement
})
function focusBorder(value: string){
    currentEditingBorder.value = value

    switch(value){
        case 'All':
            currentBorderStyle.value = styles.borderStyleAll
            currentBorderWidth.value = styles.borderWidthAll
            currentBorderColor.value = styles.borderColorAll
       
            break;
        case 'Left':
            currentBorderStyle.value = styles.borderStyleLeft
            currentBorderWidth.value = styles.borderWidthLeft
            currentBorderColor.value = styles.borderColorLeft
            break;
        case 'Right':
            currentBorderStyle.value = styles.borderStyleRight
            currentBorderWidth.value = styles.borderWidthRight
            currentBorderColor.value = styles.borderColorRight
            break;
        case 'Top':
            currentBorderStyle.value = styles.borderStyleTop
            currentBorderWidth.value = styles.borderWidthTop
            currentBorderColor.value = styles.borderColorTop
            break;
        case 'Bottom':
            currentBorderStyle.value = styles.borderStyleBottom
            currentBorderWidth.value = styles.borderWidthBottom
            currentBorderColor.value = styles.borderColorBottom
            break;
    }
}

function updateBorder(value: string){
    styles.border = value
    emits('updateElement', [{key:'style.border', value: styles.border}])
}

function updateBorderRadius(key: string, value: string){
    if(key.includes('borderTopLeftRadius')){
        styles.borderRadiusTopLeft = value
        emits('updateElement', [{key:'style.borderTopLeftRadius',value: styles.borderRadiusTopLeft}])
    }else if(key.includes('borderTopRightRadius')){
        styles.borderRadiusTopRight = value
        emits('updateElement', [{key:'style.borderTopRightRadius',value: styles.borderRadiusTopRight}])
    }else if(key.includes('borderBottomLeftRadius')){
        styles.borderRadiusBottomLeft = value
        emits('updateElement', [{key: 'style.borderBottomLeftRadius',value: styles.borderRadiusBottomLeft}])
    }else if(key.includes('borderBottomRightRadius')){
        styles.borderRadiusBottomRight = value
        emits('updateElement', [{key: 'style.borderBottomRightRadius', value: styles.borderRadiusBottomRight}])
    }else if(key.includes('borderRadius')){
        styles.borderRadiusAll = value
        emits('updateElement', [{key:'style.borderRadius', value:styles.borderRadiusAll}])
    }
}
function updateSpecificBorder(key: string, value: string){
    
    let newKey;

    switch(key){
        case 'Style':
            switch(currentEditingBorder.value){
                case 'Left':
                    newKey = 'borderLeftStyle'
                    break;
                case 'Right':
                    newKey = 'borderRightStyle'
                    break;
                case 'Top':
                    newKey = 'borderTopStyle'
                    break;
                case 'Bottom':
                    newKey = 'borderBottomStyle'
                    break;
            }
            break;
        case 'Width':
            switch(currentEditingBorder.value){
                case 'Left':
                    newKey = 'borderLeftWidth'
                    break;
                case 'Right':
                    newKey = 'borderRightWidth'
                    break;
                case 'Top':
                    newKey = 'borderTopWidth'
                    break;
                case 'Bottom':
                    newKey = 'borderBottomWidth'
                    break;
            }
            break;
        case 'Color':
            switch(currentEditingBorder.value){
                case 'Left':
                    newKey = 'borderLeftColor'
                    break;
                case 'Right':
                    newKey = 'borderRightColor'
                    break;
                case 'Top':
                    newKey = 'borderTopColor'
                    break;
                case 'Bottom':
                    newKey = 'borderBottomColor'
                    break;
            }
            break;
    }
    
    switch(newKey){
        case 'borderLeftStyle':
            styles.borderStyleLeft = value
            emits('updateElement', [{key:'style.borderLeftStyle', value:styles.borderStyleLeft}])
            break;
        case 'borderRightStyle':
            styles.borderStyleRight = value
            emits('updateElement', [{key:'style.borderRightStyle', value: styles.borderStyleRight}])
            break;
        case 'borderTopStyle':
            styles.borderStyleTop = value
            emits('updateElement', [{key:'style.borderTopStyle',value: styles.borderStyleTop}])
            break;
        case 'borderBottomStyle':
            styles.borderStyleBottom = value
            emits('updateElement', [{key:'style.borderBottomStyle', value: styles.borderStyleBottom}])
            break;
        case 'borderLeftWidth':
            styles.borderWidthLeft = value
            emits('updateElement', [{key:'style.borderLeftWidth', value:styles.borderWidthLeft}])
            break;
        case 'borderRightWidth':
            styles.borderWidthRight = value
            emits('updateElement', [{key: 'style.borderRightWidth',value: styles.borderWidthRight}])
            break;
        case 'borderTopWidth':
            styles.borderWidthTop = value
            emits('updateElement', [{key: 'style.borderTopWidth',value: styles.borderWidthTop }])
            break;
        case 'borderBottomWidth':
            styles.borderWidthBottom = value
            emits('updateElement', [{key:'style.borderBottomWidth',value: styles.borderWidthBottom }])
            break;
        case 'borderLeftColor':
            styles.borderColorLeft = value
            emits('updateElement', [{key:'style.borderLeftColor',value: styles.borderColorLeft}])
            break;
        case 'borderRightColor':
            styles.borderColorRight = value
            emits('updateElement', [{key:'style.borderRightColor',value: styles.borderColorRight}])
            break;
        case 'borderTopColor':
            styles.borderColorTop = value
            emits('updateElement', [{key:'style.borderTopColor',value: styles.borderColorTop}])
            break;
        case 'borderBottomColor':
            styles.borderColorBottom = value
            emits('updateElement', [{key:'style.borderBottomColor',value: styles.borderColorBottom}])
            break;
        case 'borderColor':
            styles.borderColorAll = value
            emits('updateElement', [{key:'style.borderColor',value: styles.borderColorAll}])
            break;
        case 'borderStyle':
            styles.borderStyleAll = value
            emits('updateElement', [{key:'style.borderStyle', value:styles.borderStyleAll}])
            break;
        case 'borderWidth':
            styles.borderWidthAll = value
            emits('updateElement', [{key:'style.borderWidth',value: styles.borderWidthAll}])
            break;
        
    }
    return;
}

function setStylesFromElement(view: ViewElement){
    if(view == undefined){
        return;
    }
    view?.style?.border ? styles.border = view.style.border : styles.border = ''

    view.style?.borderRadius ? styles.borderRadiusAll = view.style.borderRadius : styles.borderRadiusAll = ''
    view.style?.borderRadius ? styles.borderRadiusTopLeft = view.style.borderTopLeftRadius : styles.borderRadiusTopLeft = ''
    view.style?.borderRadius ? styles.borderRadiusTopRight = view.style.borderTopRightRadius : styles.borderRadiusTopRight = ''
    view.style?.borderRadius ? styles.borderRadiusBottomLeft = view.style.borderBottomLeftRadius : styles.borderRadiusBottomLeft = ''
    view.style?.borderRadius ? styles.borderRadiusBottomRight = view.style.borderBottomRightRadius : styles.borderRadiusBottomRight = ''

    view.style?.borderLeft ? styles.borderLeft = view.style.borderLeft : styles.borderLeft = ''
    view.style?.borderRight ? styles.borderRight = view.style.borderRight : styles.borderRight = ''
    view.style?.borderTop ? styles.borderTop = view.style.borderTop : styles.borderTop = ''
    view.style?.borderBottom ? styles.borderBottom = view.style.borderBottom : styles.borderBottom = ''
    view.style?.borderStyle ? styles.borderStyleAll = view.style.borderStyle : styles.borderStyleAll = ''
    view.style?.borderLeftStyle ? styles.borderStyleLeft = view.style.borderLeftStyle : styles.borderStyleLeft = ''
    view.style?.borderRightStyle ? styles.borderStyleRight = view.style.borderRightStyle : styles.borderStyleRight = ''
    view.style?.borderTopStyle ? styles.borderStyleTop = view.style.borderTopStyle : styles.borderStyleTop = ''
    view.style?.borderBottomStyle ? styles.borderStyleBottom = view.style.borderBottomStyle : styles.borderStyleBottom = ''
    view.style?.borderWidth ? styles.borderWidthAll = view.style.borderWidth : styles.borderWidthAll = ''
    view.style?.borderLeftWidth ? styles.borderWidthLeft = view.style.borderLeftWidth : styles.borderWidthLeft = ''
    view.style?.borderRightWidth ? styles.borderWidthRight = view.style.borderRightWidth : styles.borderWidthRight = ''
    view.style?.borderTopWidth ? styles.borderWidthTop = view.style.borderTopWidth : styles.borderWidthTop = ''
    view.style?.borderBottomWidth ? styles.borderWidthBottom = view.style.borderBottomWidth : styles.borderWidthBottom = ''
    view.style?.borderColor ? styles.borderColorAll = view.style.borderColor : styles.borderColorAll = ''
    view.style?.borderLeftColor ? styles.borderColorLeft = view.style.borderLeftColor : styles.borderColorLeft = ''
    view.style?.borderRightColor ? styles.borderColorRight = view.style.borderRightColor : styles.borderColorRight = ''
    view.style?.borderTopColor ? styles.borderColorTop = view.style.borderTopColor : styles.borderColorTop = ''
    view.style?.borderBottomColor ? styles.borderColorBottom = view.style.borderBottomColor : styles.borderColorBottom = ''

}

</script>

<style scoped lang="scss">

.sbec{
    background-color: theme('colors.brightgrey');
    position: relative;
}
</style>