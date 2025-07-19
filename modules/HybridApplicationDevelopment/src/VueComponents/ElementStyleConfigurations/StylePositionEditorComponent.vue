<template>
    <div class="specc">
        
        <div class="small-block-header">
            <div :style="{display:'inline-flex', alignItems: 'center', justifyContent:'center'}">
            <div>
                Position
            </div>
            <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense
                 :popup-content-style="{
                        backgroundColor: '#57595d'
                    }"
            :style="{width: '120px'}"
            @update:model-value="(v) => emits('updateElement', [{key:'style.position', value: v}])"
            :options="styleManager.positionValues"
            v-model="styles.position"
            >

            </SelectComponent>
        </div>
        <div v-show="styles.position == 'relative' || styles.position == 'absolute'">
            <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'"
                 :popup-content-style="{
                        backgroundColor: '#57595d'
                    }"
            dense
            v-model="positionPairKey"
            @update:model-value="(v) => updatePositionPair(v)"
            :options="positionPairs.map(p => { return p.key})">

            </SelectComponent>
        </div>
        <div v-show="styles.position != 'static' && styles.position != ''">
            <table>
                <tbody>
                <tr>
                <td>
                    Left
                </td>
                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.left"
                    @update:model-value="(v) => emits('updateElement', [{key:'style.left', value: v+ styles.leftUnit}])"
                     hide-bottom-space  dense class="spec-input">
                    </InputComponent>
                </td>
                <td>
                    Right
                </td>
                
                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.right"
                    color="fontwhite"
                    @update:model-value="(v) => emits('updateElement', [{key:'style.right', value: v + styles.rightUnit}])"
                     hide-bottom-space  dense class="spec-input">
                    </InputComponent>

                </td>
            </tr>

            <tr>
                <td>
                    Top
                </td>
                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.top"
                    color="fontwhite"
                    @update:model-value="(v) => emits('updateElement', [{key:'style.top', value: v + styles.topUnit}])"

                     hide-bottom-space  dense class="spec-input">

                    </InputComponent>
                </td>
                <td>
                    Bottom
                </td>

                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.bottom"
                    @update:model-value="(v) => emits('updateElement', [{key:'style.bottom', value: v + styles.bottomUnit}])"

                    color="fontwhite"
                     hide-bottom-space  dense class="spec-input">

                    </InputComponent>

                </td>
            </tr>
            <tr>
                <td colspan="3">

                </td>
                <td>
                    <InputComponent 
                    label="Z-Index"
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.bottom"
                    @update:model-value="(v) => emits('updateElement', [{key:'style.zIndex', value: v}])"

                    color="fontwhite"
                     hide-bottom-space  dense class="spec-input">
                    </InputComponent>

                </td>
            </tr>
        </tbody>
            </table>

        </div>
            <div>
                <ExpansionItemComponent label="Float and clear" dense>
                    <div :style="{display:'inline-flex', justifyContent: 'center', alignItems:'center'}">
                        <div>
                            Float
                        </div>
                        <ButtonComponent dense unelevated
                            icon="close"
                            text-color="white" 
                            :class="styles.float == 'none' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateFloat('none')">
                                    
                        </ButtonComponent>
                        <ButtonComponent dense unelevated
                            icon="chevron_left"
                            text-color="white" 
                            :class="styles.float == 'left' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateFloat('left')">
                                    
                        </ButtonComponent>
                        <ButtonComponent dense unelevated
                            icon="chevron_right"
                            text-color="white" 
                            :class="styles.float == 'right' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateFloat('right')">
                                    
                        </ButtonComponent>
                    </div>
                    <div :style="{display:'inline-flex', justifyContent: 'center', alignItems:'center'}">
                        <div>
                            Clear
                        </div>
                        <ButtonComponent dense unelevated
                            icon="close"
                            text-color="white" 
                            :class="styles.clear == 'none' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateClear('none')">
                                    
                        </ButtonComponent>
                        <ButtonComponent dense unelevated
                            icon="chevron_left"
                            text-color="white" 
                            :class="styles.clear == 'left' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateClear('left')">
                                    
                        </ButtonComponent>
                        <ButtonComponent dense unelevated
                            icon="chevron_right"
                            text-color="white" 
                            :class="styles.clear == 'right' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateClear('right')">
                                    
                        </ButtonComponent>
                        <ButtonComponent dense unelevated
                            icon="compare_arrows"
                            text-color="white" 
                            :class="styles.clear == 'both' ? 'c-darkgrey' : 'c-brightgrey'"
                            :style="{
                                display:'inline-flex', alignItems: 'center', justifyContent:'center', alignContent: 'center'}" 
                            @click="updateClear('both')">
                                    
                        </ButtonComponent>
                    </div>
                </ExpansionItemComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">import { ExpansionItemComponent } from 'alphaviewlibrary'
import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { reactive, ref,inject } from 'vue'
import { ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';
import { SplitStyle } from 'alphautils'

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
const positionPairKey = ref('')
const positionPairs = [
{
    key: 'center',
    value:{
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },

},
{
    key: 'top-left',
    value:{
        top: '0',
        left: '0'
    },
},
{
    key: 'top',
    value:{
        top: '0'
    }
},

{
    key: 'top-right',
    value:{
        top: '0',
        right: '0'
    },
},
{
    key: 'left',
    value:{
        left: '0'
    },
},
{
    key: 'right',
    value:{
        right: '0'
    },
},
{
    key: 'bottom-left',
    value:{
        bottom: '0',
        left: '0'
    },
},
{
    key: 'bottom',
    value:{
        bottom: '0'
    },
},
{
    key: 'bottom-right',
    value:{
        bottom: '0',
        right: '0'
    },
}


]
const emits= defineEmits(['updateElement'])

const styles = reactive({
    position: '',
    float: '',
    clear: '',
    left: '',
    leftUnit: '',
    right: '',
    rightUnit: '',
    top: '',
    topUnit: '',
    bottom: '',
    bottomUnit: '',
    zIndex: ''

})
function updatePositionPair(key: string){
    positionPairKey.value = key
    const pair = positionPairs.find(p => p.key == key)
    if(pair){
        Object.keys(pair.value).forEach(k => {
            styles[k] = pair.value[k]
        })
    }
    Object.keys(pair.value).forEach(k => {
        emits('updateElement', [{key: 'style.' + k, value: styles[k]}])
    })

   
}
function updateFloat(float: string){
    styles.float = float
    emits('updateElement', [{key: 'style.float', value: float}])
}
function updateClear(clear: string){
    styles.clear = clear
    emits('updateElement', [{key: 'style.clear', value: clear}])
}
function setStylesFromElement(view: ViewElement){
    if(view== undefined){
        return;
    }

    const styleKeys = ['position', 'float', 'clear', 'left', 'right', 'top', 'bottom', 'zIndex']
    for(const [key] of Object.entries(view.style)){
        if(styleKeys.includes(key)){            
            const {value, unit } = SplitStyle(view.style[key])
            styles[key] = value

            if(key == 'left' || key == 'right' || key == 'top' || key == 'bottom'){
                styles[key + 'Unit'] = unit
            }
        }
    }


    if(view.style?.left == '0' && view.style?.top == '0'){
        positionPairKey.value = 'top-left'
    }
    else if(view.style?.left == '0' && view.style?.bottom == '0'){
        positionPairKey.value = 'bottom-left'
    }
    else if(view.style?.right == '0' && view.style?.top == '0'){
        positionPairKey.value = 'top-right'
    }
    else if(view.style?.right == '0' && view.style?.bottom == '0'){
        positionPairKey.value = 'bottom-right'
    }
    else if(view.style?.left == '0'){
        positionPairKey.value = 'left'
    }
    else if(view.style?.right == '0'){
        positionPairKey.value = 'right'
    }
    else if(view.style?.top == '0'){
        positionPairKey.value = 'top'
    }
    else if(view.style?.bottom == '0'){
        positionPairKey.value = 'bottom'
    }
    else{
        positionPairKey.value = ''
    }
}


</script>

<style scoped lang="scss">
 .specc{
     background-color: theme('colors.brightgrey');
     display:inline-flex;

     width: 100%;
     position: relative;
 }
</style>