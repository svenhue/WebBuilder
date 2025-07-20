<template>
    <div :style="{display: 'flex'}">  
        <UButton  
        class="application-screen-btn"
        dense
        icon="mdi:monitor"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultDesktopWidth'), varProvider.GetVariable(props.contextid, 'defaultDesktopHeight'))"
        >

        </UButton>
        <UButton
 
        class="application-screen-btn"
        dense
        icon="mdi:tablet"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultTabletWidth'), varProvider.GetVariable(props.contextid, 'defaultTabletHeight'))"
        >

        </UButton>
        <UButton

        class="application-screen-btn"
        dense
        icon="mdi:mobile-phone"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultMobileWidth'), varProvider.GetVariable(props.contextid, 'defaultMobileHeight'))"
        >

        </UButton>
    </div>
</template>

<script setup lang="ts">

import { Screen } from 'alphautils'
import { BaseServiceProvider } from 'alphautils';
import { GlobalVariableDataProvider } from '../../utils/Application/GlobalsVariableProvider/GlobalVariableDataProvider';

const props = defineProps({
    contextid:{
        type: Number,
        required:true
    }
})

const serviceProvider = new BaseServiceProvider(props.contextid)
const screen = serviceProvider.GetService<Screen>('Screen')
const varProvider = BaseServiceProvider.ServiceWithContext<GlobalVariableDataProvider>('GlobalVariableDataProvider', props.contextid)

function SetScreen(width: number, height: number){
   
    screen.ChangeScreenSize(width, height)
}
function SetMaxScreen(){
    screen.ChangeScreenSize(window.innerWidth -50 +'px', window.innerHeight-150+'px')

}

</script>

<style scoped lang="scss">
.application-screen-btn{
    width:40px;
    
}
</style>