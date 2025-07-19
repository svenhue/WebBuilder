<template>
    <div class="spec-outer">
        <div class="spec-header" :style="{left:'25px', top: '3px'}">
            Margin
        </div>
        <div
        class="spec-input"
        :style="{left: '92px', top: '2px'}">
        {{  styles.marginTop  }}
        <q-popup-edit 
        v-model="styles.marginTop" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.marginTop" 
                @update:model-value="(value) => updateSpacing('style.marginTop', value + styles.marginTopUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.marginTopUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.marginTop', styles.marginTop + value)" >
                        
                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{left: '5px', top: '48px'}"> 
               {{  styles.marginLeft  }}
        <q-popup-edit v-model="styles.marginLeft" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.marginLeft" 
                @update:model-value="(value) => updateSpacing('style.marginLeft', value + styles.marginLeftUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.marginLeftUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.marginLeft', styles.marginLeft + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{right: '-8px', top: '49px'}"> 
               {{  styles.marginRight  }}
        <q-popup-edit v-model="styles.marginLeft" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.marginRight" 
                @update:model-value="(value) => updateSpacing('style.marginRight', value + styles.marginRightUnit)" 

                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.marginRightUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.marginRight', styles.marginRight + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{left: '95px', bottom: '0px'}"> 
               {{  styles.marginBottom  }}
        <q-popup-edit v-model="styles.marginBottom" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.marginBottom" 
                @update:model-value="(value) => updateSpacing('style.marginBottom', value + styles.marginBottomUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.marginBottomUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.marginBottom', styles.marginBottom + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>

        <div class="spec-middle" >
            <div class="spec-header" :style="{left: '30px', top: '25px'}">
                Padding
            </div>
            <div
        class="spec-input"
        :style="{left: '95px', top: '25px'}"> 
               {{  styles.paddingTop  }}
        <q-popup-edit v-model="styles.paddingTop" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.paddingTop" 
                @update:model-value="(value) => updateSpacing('style.paddingTop', value + styles.paddingTopUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.paddingTopUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.paddingTop', styles.paddingTop + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{left: '35px', top: '48px'}"> 
               {{  styles.paddingLeft  }}
        <q-popup-edit v-model="styles.paddingLeft" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.paddingLeft" 
                @update:model-value="(value) => updateSpacing('style.paddingLeft', value + styles.paddingLeftUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.paddingLeftUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.paddingLeft', styles.paddingLeft + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{right: '19px', top: '48px'}"> 
               {{  styles.paddingRight  }}
        <q-popup-edit v-model="styles.paddingRight" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                dark color="white" v-model="styles.paddingRight" 
                @update:model-value="(value) => updateSpacing('style.paddingRight', value + styles.paddingRightUnit)" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.paddingRightUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.paddingRight', styles.paddingRight + value)" >
>

                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
        <div
        class="spec-input"
        :style="{left: '95px', bottom: '25px'}"> 
               {{  styles.paddingBottom  }}
        <q-popup-edit v-model="styles.paddingBottom" class="c-darkgrey" v-slot="scope">
            <div :style="{display:'inline-flex', alignItems:'center'}">
                <InputComponent
                :style="{width: '200px'}" 
                @update:model-value="(value) => updateSpacing('style.paddingBottom', value + styles.paddingBottomUnit)" 
                dark color="white" v-model="styles.paddingBottom" 
                dense autofocus counter @keyup.enter="scope.set">
                    <template v-slot:append>
                    <q-select class="alpha-select"
                :popup-content-class="'alpha-dropdown-content'" dense v-model="styles.paddingBottomUnit" :options="styleManager.sizeUnits"
                    @update:model-value="(value) => updateSpacing('style.paddingBottom', styles.paddingBottom + value)" >


                    </q-select>
                    </template>
                </InputComponent>
            </div>
        </q-popup-edit>
        </div>
            <div class="spec-inner">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

import { reactive, inject } from 'vue';
import { ViewElement } from 'alphautils';
import { StyleManagerViewModel } from '../../ViewModels/StyleManagerViewModel';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const styleManager = inject('styleManager_'+props.contextid) as StyleManagerViewModel
defineExpose({
    setStylesFromElement,
})
const emits = defineEmits(['updateElement'])

function setStylesFromElement(view: ViewElement){
    if(view == undefined || view.style == undefined){
        return;
    }

    Object.entries(view.style).forEach(([key, v]) => {
        if(styles[key] != undefined){
            
            styles[key] = v?.match(/\d+/) != undefined ? v?.match(/\d+/)[0] : 0;
            styles[key+'Unit'] = v?.match(/[a-z]+/) != undefined ? v?.match(/[a-z]+/) : '';
        }
    })


}
function updateSpacing(key: string, v: string){
    emits('updateElement', [{key: key, value: v}])
}
const styles = reactive({
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeftUnit: 'px',
    marginRightUnit: 'px',
    marginTopUnit: 'px',
    marginBottomUnit: 'px',
    paddingLeftUnit: 'px',
    paddingRightUnit: 'px',
    paddingTopUnit: 'px',
    paddingBottomUnit: 'px',

})
</script>

<style scoped lang="scss">

 .spec-outer {
     width: 200px;
     height: 120px;
     position:relative;
     display: flex;
     justify-content: center;
     align-items: center;
     background-color: theme('colors.brightgrey');
     .spec-middle {
         width: 150px;
         height: 70px;
         display: flex;
         justify-content: center;
         align-items: center;
         background-color: theme('colors.darkgrey');
         .spec-inner {
             width: 90px;
             height: 30px;
             display: flex;
             justify-content: center;
             align-items: center;
             background-color: theme('colors.brightgrey');
         }
     }
     .spec-header{
         position: absolute;
         font-size: x-small;
     }
     .spec-input{
         position: absolute;
         width: 25px;
     }
 }
</style>