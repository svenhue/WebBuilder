<template>

        <div class="app-header" elevated :style="{zIndex: 999, display:'flex', alignItems: 'center'}">
            
        </div>     

</template>


<script setup lang="ts">
import { BaseServiceProvider, TabService } from 'alphautils';
import '../css/app.scss'
import {  ref } from 'vue';

let tabService: TabService;

const props = defineProps({
    contextid: {
        type: Number,
        required:true
    }
})



if(typeof process == 'undefined'){
        tabService = BaseServiceProvider.ServiceWithContext<TabService>('TabService', 1)
       
}else if(process.server == false){
    tabService =BaseServiceProvider.ServiceWithContext<TabService>('TabService', 1)
       
}

async function HandleTabChange(tab){
    if(tab != tabService.ActiveTab.value.title){
        const tabV = tabService.GetTabs().value.find(t => t.title == tab)
        tabService.OpenTab(tabV)
    }
    
}


const leftDrawerOpen = ref(false)

function toggleLeftDrawer(){
    leftDrawerOpen.value = !leftDrawerOpen.value

}

const essentialLinks = [
    {
        title: 'Home',
        icon: 'home',
        to: '/'
    },
    {
        title: 'create Website',
        icon: 'info',
        to: '/createApp'
    },
    {
        title: 'Marketplace',
        icon: 'info',
        to: '/marketplace'
    }
]
/*

*/
</script>

<style scoped lang="scss">
.main-drawer{
    position: fixed;
}
</style>