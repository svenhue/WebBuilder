<template>
    <div :style="{display: 'flex'}">  
        <q-btn  
        class="application-screen-btn"
        dense
        icon="monitor"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultDesktopWidth'), varProvider.GetVariable(props.contextid, 'defaultDesktopHeight'))"
        >

        </q-btn>
        <q-btn
 
        class="application-screen-btn"
        dense
        icon="tablet"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultTabletWidth'), varProvider.GetVariable(props.contextid, 'defaultTabletHeight'))"
        >

        </q-btn>
        <q-btn

        class="application-screen-btn"
        dense
        icon="phone_iphone"
        @click="SetScreen(varProvider.GetVariable(props.contextid, 'defaultMobileWidth'), varProvider.GetVariable(props.contextid, 'defaultMobileHeight'))"
        >

        </q-btn>
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