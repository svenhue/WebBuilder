<template>
    <div class="sdec">
        <table>
            <colgroup>
            <col width="30"><col width="50"><col width="50"><col width="50"><col width="50">
        </colgroup>
            <tbody>
            <tr >
                <td>
                    Width
                </td>
                <td>
                    <InputComponent 
                    
                    class="alpha-input-base"
                    :input-class="'alpha-input'"
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.width"
                    type="text"
                    @update:model-value="(v) => UpdateStyle('style.width', v)"
                    hide-bottom-space  dense>
                    </InputComponent>
                </td>
                <td>
                    Height
                </td>
                
                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.height"
                    color="fontwhite"
                    @update:model-value="(v) => UpdateStyle('style.height', v)"
                     hide-bottom-space  dense 
                      class="alpha-input-base"
                    :input-class="'alpha-input'"
                    >
                    </InputComponent>

                </td>
            </tr>

            <tr>
                <td>
                    Min W
                </td>
                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.minWidth"
                    color="fontwhite"
                    @update:model-value="(v) => UpdateStyle('style.minWidth', v)"
                     hide-bottom-space  dense  class="alpha-input-base"
                    :input-class="'alpha-input'">

                    </InputComponent>
                </td>
                <td>
                    Min H
                </td>

                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.minHeight"
                    @update:model-value="(v) => UpdateStyle('style.minHeight', v )"
                    color="fontwhite"
                     hide-bottom-space  dense  class="alpha-input-base"
                    :input-class="'alpha-input'">

                    </InputComponent>

                </td>
            </tr>
            <tr>
                <td>
                    Max W
                </td>

                <td>
                    <InputComponent 
                    :style="{left: '22px', top: '40px'}"
                    v-model="styles.maxWidth"
                    color="fontwhite"
                    @update:model-value="(v) => UpdateStyle('style.maxWidth', v)"
                     hide-bottom-space  dense  class="alpha-input-base"
                    :input-class="'alpha-input'">
 
                    </InputComponent>
                </td>

                <td>
                    Max H
                </td>

                <td>
                    <InputComponent 
                    @update:model-value="(v) => UpdateStyle('style.maxHeight', v)"
                    :style="{left: '', top: '40px'}"
                    v-model="styles.maxHeight"
                    color="fontwhite"

                     hide-bottom-space  dense  class="alpha-input-base"
                    :input-class="'alpha-input'">
                    </InputComponent>

                </td>
            </tr>

            <tr>
                <td>
                    Overflow
                </td>

                <td colspan="4"  :style="{justifyContent: 'space-between'}">
                    <div :style="{display: 'inline-flex', width:'100%', justifyContent:'space-evenly'}">
                    <ButtonComponent dense icon="visibility" unelevated 
                    :style="{color: overflowIsVisibility == true ? 'black' : 'white'}"
                        @click="overflowIsVisibility = !overflowIsVisibility ,
                        changeOverflow(overflowIsVisibility == false ? '' : 'visibel')">
                    </ButtonComponent>
                    <ButtonComponent dense icon="visibility_off" unelevated 
                    :style="{color: overflowIsVisibilityOff == true ? 'black' : 'white'}"
                        @click="overflowIsVisibilityOff = !overflowIsVisibilityOff ,
                        changeOverflow(overflowIsVisibilityOff == false ? '' : 'hidden')">
                    </ButtonComponent>
                    <ButtonComponent dense icon="format_line_spacing" unelevated 
                    :style="{color: overflowIsLineSpacing == true ? 'black' : 'white'}"
                        @click="overflowIsLineSpacing = !overflowIsLineSpacing ,
                        changeOverflow(overflowIsLineSpacing == false ? '' : 'scroll')">
                    </ButtonComponent>
                    <ButtonComponent dense label="Auto" unelevated 
                    :style="{color: overflowIsAuto == true ? 'black' : 'white'}"
                        @click="overflowIsAuto = !overflowIsAuto ,
                        changeOverflow(overflowIsAuto == false ? '' : 'auto')">
                    </ButtonComponent>

                    </div>
                  
                </td>
            </tr>
            <tr>
                <td>
                    Fit
                </td>

                <td colspan="3">
                    <SelectComponent class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" 
                    :popup-content-style="{
                        backgroundColor: '#57595d'
                    }"
           
                    dense @update:model-value="(valuee) => emits('updateElement', [{key: 'style.objectFit', value: valuee}])" 
                    v-model="styles.objectFit" :options="styleManager.objectFits">

                    </SelectComponent>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { reactive, ref, inject } from 'vue';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';
import { IViewConfiguration, ViewConfiguration } from 'alphautils';


const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})
const emits = defineEmits(['updateElement'])

const styleManager = inject('styleManager_'+ props.contextid) as StyleManagerViewModel
const overflowIsVisibility = ref(false)
const overflowIsVisibilityOff = ref(false)
const overflowIsLineSpacing = ref(false)
const overflowIsAuto = ref(false)

const styles = reactive({
    width: '',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: '',
    maxHeight: '',
    objectFit: '',
    overflow: ''
})

function setStylesFromElement(view: IViewConfiguration){

    if(view == undefined){
        return;
    }
    
    styles.width = view?.style?.width != undefined ? view?.style?.width : ''
    styles.height = view?.style?.height != undefined? view?.style?.height : ''
    styles.minWidth = view?.style?.minWidth != undefined ? view?.style?.minWidth : ''
    styles.minHeight = view?.style?.minHeight != undefined? view?.style?.minHeight : ''
    styles.maxWidth = view?.style?.maxWidth != undefined? view?.style?.maxWidth : ''
    styles.maxHeight = view?.style?.maxHeight != undefined? view?.style?.maxHeight : ''
    styles.objectFit = view?.style?.objectFit != undefined? view?.style?.objectFit : ''
    styles.overflow = view?.style?.overflow != undefined? view?.style?.overflow : ''
}
function changeOverflow(value: string){
    switch(value){
        case('visibel'):
            overflowIsVisibility.value = true
            overflowIsVisibilityOff.value = false
            overflowIsLineSpacing.value = false
            overflowIsAuto.value = false
            break;
        case('hidden'):
            overflowIsVisibility.value = false
            overflowIsVisibilityOff.value = true
            overflowIsLineSpacing.value = false
            overflowIsAuto.value = false
            break;
        case('scroll'):
            overflowIsVisibility.value = false
            overflowIsVisibilityOff.value = false
            overflowIsLineSpacing.value = true
            overflowIsAuto.value = false
            break;
        case('auto'):
            overflowIsVisibility.value = false
            overflowIsVisibilityOff.value = false
            overflowIsLineSpacing.value = false
            overflowIsAuto.value = true
            break;
        case(''):
            overflowIsVisibility.value = false
            overflowIsVisibilityOff.value = false
            overflowIsLineSpacing.value = false
            overflowIsAuto.value = false
            break;
    }

    emits('updateElement', [{key:'style.overflow', value: value}])
    styles.overflow = value
}

defineExpose({
    setStylesFromElement
})

function UpdateStyle(key: string, value: string){
    emits('updateElement', [{key: key, value: value}])
}

</script>

<style scoped lang="scss">
 .sdec{
     background-color: var(--color-brightgrey);
     input{
        width: 90px;
       
     }
     .sp{
         width: min-content;
     }
     
 }
 .fit-dropdown{
        background-color: var(--color-darkgrey);
    }
</style>