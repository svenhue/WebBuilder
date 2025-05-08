<template>
    <div class="sbec">
        <div :style="{display:'inline-flex'}">
            <div class="small-block-header">
                Radius
            </div>
        </div>
        <div :style="{display:'inline-flex', alignItems: 'center'}">
            <div class="small-block-header">
                All
            </div>
            <q-input
                                dense
                                bottom-slots
                                @update:model-value="(v) => updateBorderRadius('borderRadius', v + styles.borderRadiusAllUnit)"
                                v-model="styles.borderRadiusAll">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="styles.borderRadiusAllUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
        </div>
        <div v-show="allCorners == false">
            <table>
                <tbody>
                <tr>
                    <td>
                        <q-input
                        label="Top Left"
                                dense
                                bottom-slots
                                @update:model-value="(v) => updateBorderRadius('borderTopLeftRadius', v + styles.borderRadiusTopLeftUnit)"
                                v-model="styles.borderRadiusTopLeft">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="styles.borderRadiusTopLeftUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
                    </td>
                    <td>
                        <q-input
                        label="Top Right"
                                dense
                                bottom-slots
                                @update:model-value="(v) => updateBorderRadius('borderRadius', v + styles.borderRadiusTopRight)"
                                v-model="styles.borderRadiusTopRight">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="styles.borderRadiusTopRightUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <q-input
                        label="Bottom Left"
                                dense
                                bottom-slots
                                @update:model-value="(v) => updateBorderRadius('borderRadius', v + styles.borderRadiusBottomLeftUnit)"
                                v-model="styles.borderRadiusBottomLeft">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="styles.borderRadiusBottomLeftUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
                    </td>
                    <td>
                        <q-input
                        
                        label="Bottom Right"
                                dense
                                bottom-slots
                                @update:model-value="(v) => updateBorderRadius('borderRadius', v + styles.borderRadiusBottomRight)"
                                v-model="styles.borderRadiusBottomRight">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="styles.borderRadiusBottomRightUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
                    </td>
                </tr>
            </tbody>
            </table>
            <div>
                <div class="small-block-header">
                    Borders
                </div>
                <div :style="{display:'inline-flex'}">
                <div :style="{width: '90px', height: '90px', position: 'relative'}">
                    <q-icon @click="focusBorder('All')"  :class="currentEditingBorder == 'All' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_outer" size="25px" :style="{position:'absolute', left:'32.5px', top:'32.5px'}" />
                    <q-icon @click="focusBorder('Left')" :class="currentEditingBorder == 'Left' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_left" size="25px" :style="{position:'absolute', left:'0px', top:'32.5px'}" />
                    <q-icon @click="focusBorder('Right')" :class="currentEditingBorder == 'Right' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_right" size="25px" :style="{position:'absolute', left:'63px', top:'32.5px'}"/>
                    <q-icon @click="focusBorder('Top')" :class="currentEditingBorder == 'Top' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_top" size="25px" :style="{position:'absolute', left:'32.5px', top:'0px'}"/>
                    <q-icon @click="focusBorder('Bottom')" :class="currentEditingBorder == 'Bottom' ? 'c-darkgrey' : 'c-brightgrey' " color="white" name="border_bottom" size="25px" :style="{position:'absolute', left:'32.5px', bottom:'0px'}"/>
                </div>
                <div :style="{marginLeft: '60px'}">
                    <div :style="{display:'inline-flex', alignItems:'center'}">
                        <div>
                            Border
                        </div>
                        <q-input dense
                        :style="{width: '120px'}"
                        @update:model-value="(v: string) => updateBorder(v)"
                        v-model="styles.border"
                        >
                        </q-input>
                    </div>
                    <div :style="{display:'inline-flex', alignItems:'center'}">
                        <div>
                            Style
                        </div>
                        <q-select dense
                        :style="{width: '120px'}"
                        @update:model-value="(v) => updateSpecificBorder('Style', v)"
                        :options="styleManager.borderStyles"
                        v-model="currentBorderStyle"
                        >
                        </q-select>
                    </div>
                    <div :style="{display:'inline-flex', alignItems:'center'}">
                        <div>
                            Width
                        </div>
                    <q-input
                        :style="{width: '115px'}"
                                dense
                                @update:model-value="(v) => updateSpecificBorder('Width', v + currentBorderWidthUnit)"
                                v-model="currentBorderWidth">
                                    <template v-slot:append>
                                        <q-select dense 
                                            v-model="currentBorderWidthUnit"
                                            :options="styleManager.sizeUnits">
                                            </q-select>
                                    </template>
                                </q-input>
                            </div>

                            <div :style="{display:'inline-flex', alignItems:'center'}">
                                <div>
                                Color
                                </div>
                                <q-input
                                filled dense
                                @update:model-value="(v) => updateSpecificBorder('Color', v)"
                                v-model="currentBorderColor"
                                :style="{width: '115px'}"
                            >
                                <template v-slot:append>
                                <q-icon name="colorize" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-color v-model="currentBorderColor" @update:model-value="(v) => updateSpecificBorder('Color', v)"></q-color>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                            </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
const currentBorderWidthUnit = ref('px')



const styles = reactive({
    borderRadiusAll: '',
    borderRadiusAllUnit: 'px',
    borderRadiusTopLeft: '',
    borderRadiusTopLeftUnit: 'px',
    borderRadiusTopRight: '',
    borderRadiusTopRightUnit: 'px',
    borderRadiusBottomLeft: '',
    borderRadiusBottomLeftUnit: 'px',
    borderRadiusBottomRight: '',
    borderRadiusBottomRightUnit: 'px',

    borderLeft: '',
    borderLeftUnit: 'px',
    borderRight: '',
    borderRightUnit: 'px',
    borderTop: '',
    borderTopUnit: 'px',
    borderBottom: '',
    borderBottomUnit: 'px',
    borderStyleAll: '',
    borderStyleLeft: '',
    borderStyleRight: '',
    borderStyleTop: '',
    borderStyleBottom: '',
    borderWidthAll: '',
    borderWidthAllUnit: 'px',
    borderWidthLeftUnit: 'px',
    borderWidthRightUnit: 'px',
    borderWidthTopUnit: 'px',
    borderWidthBottomUnit: 'px',
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
            currentBorderWidthUnit.value = styles.borderWidthAllUnit
            break;
        case 'Left':
            currentBorderStyle.value = styles.borderStyleLeft
            currentBorderWidth.value = styles.borderWidthLeft
            currentBorderColor.value = styles.borderColorLeft
            currentBorderWidthUnit.value = styles.borderWidthLeftUnit
            break;
        case 'Right':
            currentBorderStyle.value = styles.borderStyleRight
            currentBorderWidth.value = styles.borderWidthRight
            currentBorderColor.value = styles.borderColorRight
            currentBorderWidthUnit.value = styles.borderWidthRightUnit
            break;
        case 'Top':
            currentBorderStyle.value = styles.borderStyleTop
            currentBorderWidth.value = styles.borderWidthTop
            currentBorderColor.value = styles.borderColorTop
            currentBorderWidthUnit.value = styles.borderWidthTopUnit
            break;
        case 'Bottom':
            currentBorderStyle.value = styles.borderStyleBottom
            currentBorderWidth.value = styles.borderWidthBottom
            currentBorderColor.value = styles.borderColorBottom
            currentBorderWidthUnit.value = styles.borderWidthBottomUnit
            break;
    }
}

function updateBorder(value: string){
    styles.border = value
    emits('updateElement', [{key:'style.border', value: styles.border}])
}

function updateBorderRadius(key: string, value: string){
    if(key.includes('borderTopLeftRadius')){
        styles.borderRadiusTopLeft = value.match(/\d+/)[0]
        styles.borderRadiusTopLeftUnit = value.replace(/\d+/,'')
        emits('updateElement', [{key:'style.borderTopLeftRadius',value: styles.borderRadiusTopLeft + styles.borderRadiusTopLeftUnit}])
    }else if(key.includes('borderTopRightRadius')){
        styles.borderRadiusTopRight = value.match(/\d+/)[0]
        styles.borderRadiusTopRightUnit = value.replace(/\d+/,'')
        emits('updateElement', [{key:'style.borderTopRightRadius',value: styles.borderRadiusTopRight + styles.borderRadiusTopRightUnit}])
    }else if(key.includes('borderBottomLeftRadius')){
        styles.borderRadiusBottomLeft = value.match(/\d+/)[0]
        styles.borderRadiusBottomLeftUnit = value.replace(/\d+/,'')
        emits('updateElement', [{key: 'style.borderBottomLeftRadius',value: styles.borderRadiusBottomLeft + styles.borderRadiusBottomLeftUnit}])
    }else if(key.includes('borderBottomRightRadius')){
        styles.borderRadiusBottomRight = value.match(/\d+/)[0]
        styles.borderRadiusBottomRightUnit = value.replace(/\d+/,'')
        emits('updateElement', [{key: 'style.borderBottomRightRadius', value: styles.borderRadiusBottomRight + styles.borderRadiusBottomRightUnit}])
    }else if(key.includes('borderRadius')){
        styles.borderRadiusAll = value.match(/\d+/)[0]
        styles.borderRadiusAllUnit = value.replace(/\d+/,'')
        emits('updateElement', [{key:'style.borderRadius', value:styles.borderRadiusAll + styles.borderRadiusAllUnit}])
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
            styles.borderWidthLeft = value.match(/\d+/)[0]
            styles.borderWidthLeftUnit = value.replace(/\d+/,'')
            emits('updateElement', [{key:'style.borderLeftWidth', value:styles.borderWidthLeft + styles.borderWidthLeftUnit}])
            break;
        case 'borderRightWidth':
            styles.borderWidthRight = value.match(/\d+/)[0]
            styles.borderWidthRightUnit = value.replace(/\d+/,'')
            emits('updateElement', [{key: 'style.borderRightWidth',value: styles.borderWidthRight + styles.borderWidthRightUnit}])
            break;
        case 'borderTopWidth':
            styles.borderWidthTop = value.match(/\d+/)[0]
            styles.borderWidthTopUnit = value.replace(/\d+/,'')
            emits('updateElement', [{key: 'style.borderTopWidth',value: styles.borderWidthTop + styles.borderWidthTopUnit}])
            break;
        case 'borderBottomWidth':
            styles.borderWidthBottom = value.match(/\d+/)[0]
            styles.borderWidthBottomUnit = value.replace(/\d+/,'')
            emits('updateElement', [{key:'style.borderBottomWidth',value: styles.borderWidthBottom + styles.borderWidthBottomUnit}])
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
            styles.borderWidthAll = value.match(/\d+/)[0]
            styles.borderWidthAllUnit = value.replace(/\d+/,'')
            emits('updateElement', [{key:'style.borderWidth',value: styles.borderWidthAll + styles.borderWidthAllUnit}])
            break;
        
    }
    return;
}

function setStylesFromElement(view: ViewElement){
    if(view == undefined){
        return;
    }
    view?.style?.border ? styles.border = view.style.border : styles.border = ''

    view.style?.borderRadius ? styles.borderRadiusAll = view.style.borderRadius.match(/\d+/)[0] : styles.borderRadiusAll = ''
    view.style?.borderRadius ? styles.borderRadiusAllUnit = view.style.borderRadius.match(/[a-zA-Z]+/)[0] : styles.borderRadiusAllUnit = 'px'
    view.style?.borderRadius ? styles.borderRadiusTopLeft = view.style.borderTopLeftRadius.match(/\d+/)[0] : styles.borderRadiusTopLeft = ''
    view.style?.borderRadius ? styles.borderRadiusTopLeftUnit = view.style.borderTopLeftRadius.match(/[a-zA-Z]+/)[0] : styles.borderRadiusTopLeftUnit = 'px'
    view.style?.borderRadius ? styles.borderRadiusTopRight = view.style.borderTopRightRadius.match(/\d+/)[0] : styles.borderRadiusTopRight = ''
    view.style?.borderRadius ? styles.borderRadiusTopRightUnit = view.style.borderTopRightRadius.match(/[a-zA-Z]+/)[0] : styles.borderRadiusTopRightUnit = 'px'
    view.style?.borderRadius ? styles.borderRadiusBottomLeft = view.style.borderBottomLeftRadius.match(/\d+/)[0] : styles.borderRadiusBottomLeft = ''
    view.style?.borderRadius ? styles.borderRadiusBottomLeftUnit = view.style.borderBottomLeftRadius.match(/[a-zA-Z]+/)[0] : styles.borderRadiusBottomLeftUnit = 'px'
    view.style?.borderRadius ? styles.borderRadiusBottomRight = view.style.borderBottomRightRadius.match(/\d+/)[0] : styles.borderRadiusBottomRight = ''
    view.style?.borderRadius ? styles.borderRadiusBottomRightUnit = view.style.borderBottomRightRadius.match(/[a-zA-Z]+/)[0] : styles.borderRadiusBottomRightUnit = 'px'

    view.style?.borderLeft ? styles.borderLeft = view.style.borderLeft.match(/\d+/)[0] : styles.borderLeft = ''
    view.style?.borderLeft ? styles.borderLeftUnit = view.style.borderLeft.match(/[a-zA-Z]+/)[0] : styles.borderLeftUnit = 'px'
    view.style?.borderRight ? styles.borderRight = view.style.borderRight.match(/\d+/)[0] : styles.borderRight = ''
    view.style?.borderRight ? styles.borderRightUnit = view.style.borderRight.match(/[a-zA-Z]+/)[0] : styles.borderRightUnit = 'px'
    view.style?.borderTop ? styles.borderTop = view.style.borderTop.match(/\d+/)[0] : styles.borderTop = ''
    view.style?.borderTop ? styles.borderTopUnit = view.style.borderTop.match(/[a-zA-Z]+/)[0] : styles.borderTopUnit = 'px'
    view.style?.borderBottom ? styles.borderBottom = view.style.borderBottom.match(/\d+/)[0] : styles.borderBottom = ''
    view.style?.borderBottom ? styles.borderBottomUnit = view.style.borderBottom.match(/[a-zA-Z]+/)[0] : styles.borderBottomUnit = 'px'
    view.style?.borderStyle ? styles.borderStyleAll = view.style.borderStyle : styles.borderStyleAll = ''
    view.style?.borderLeftStyle ? styles.borderStyleLeft = view.style.borderLeftStyle : styles.borderStyleLeft = ''
    view.style?.borderRightStyle ? styles.borderStyleRight = view.style.borderRightStyle : styles.borderStyleRight = ''
    view.style?.borderTopStyle ? styles.borderStyleTop = view.style.borderTopStyle : styles.borderStyleTop = ''
    view.style?.borderBottomStyle ? styles.borderStyleBottom = view.style.borderBottomStyle : styles.borderStyleBottom = ''
    view.style?.borderWidth ? styles.borderWidthAll = view.style.borderWidth.match(/\d+/)[0] : styles.borderWidthAll = ''
    view.style?.borderWidth ? styles.borderWidthAllUnit = view.style.borderWidth.match(/[a-zA-Z]+/)[0] : styles.borderWidthAllUnit = 'px'
    view.style?.borderLeftWidth ? styles.borderWidthLeft = view.style.borderLeftWidth.match(/\d+/)[0] : styles.borderWidthLeft = ''
    view.style?.borderLeftWidth ? styles.borderWidthLeftUnit = view.style.borderLeftWidth.match(/[a-zA-Z]+/)[0] : styles.borderWidthLeftUnit = 'px'
    view.style?.borderRightWidth ? styles.borderWidthRight = view.style.borderRightWidth.match(/\d+/)[0] : styles.borderWidthRight = ''
    view.style?.borderRightWidth ? styles.borderWidthRightUnit = view.style.borderRightWidth.match(/[a-zA-Z]+/)[0] : styles.borderWidthRightUnit = 'px'
    view.style?.borderTopWidth ? styles.borderWidthTop = view.style.borderTopWidth.match(/\d+/)[0] : styles.borderWidthTop = ''
    view.style?.borderTopWidth ? styles.borderWidthTopUnit = view.style.borderTopWidth.match(/[a-zA-Z]+/)[0] : styles.borderWidthTopUnit = 'px'
    view.style?.borderBottomWidth ? styles.borderWidthBottom = view.style.borderBottomWidth.match(/\d+/)[0] : styles.borderWidthBottom = ''
    view.style?.borderBottomWidth ? styles.borderWidthBottomUnit = view.style.borderBottomWidth.match(/[a-zA-Z]+/)[0] : styles.borderWidthBottomUnit = 'px'
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
    overflow:hidden;
}
</style>