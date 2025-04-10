<template>
    <div>

    index
    </div>
</template>


<script setup lang="ts">
import { BaseServiceProvider, TabService } from 'webbuilderalphautils';
import { ref } from 'vue'
import CreationsComponent from '../../../components/CreationsComponent.vue';
import { useRouter } from '#app';
let tabService: TabService;


const components = {
    CreationsComponent
}
console.log(CreationsComponent)
const activeTab = ref('')
const activeComponent = computed(() => {
    console.log(123, components[activeTab.value])
    return components[activeTab.value]
})

if(typeof process == 'undefined'){
        tabService = BaseServiceProvider.ServiceWithContext<TabService>('TabService', 1)
       
}else if(process.server == false){
    tabService =BaseServiceProvider.ServiceWithContext<TabService>('TabService', 1)
       
}

tabService.AddTab({
    title: 'Creations',
    name: 'CreationsComponent',
    path: 'Home/Creations'
})


function handle(){
    useRouter().push('/Home/Creations')
}

</script>

<style scoped lang="scss">

.home_header{
    background-color: theme('colors.primary');
    height: 50px;
    display: flex;
    align-items: center
}
.home-tabs{
    width: 100%;
    
}
</style>