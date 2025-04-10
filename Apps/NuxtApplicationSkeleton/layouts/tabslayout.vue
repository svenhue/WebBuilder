<template>
    <div>
        <q-tabs class="tabs-layout-tabs" align="left">
            <q-tab v-for="tab in tabService?.GetTabs().value"
            
            :key="tab?.name" 
            :label="tab?.name" 
            :to="tab?.path" 
            @click="tabService.OpenTab(tab)">
            </q-tab>
        </q-tabs>
        
        <main>
            <slot ></slot>
        </main>
    </div>
</template>


<script setup lang="ts">
import { BaseServiceProvider, TabService } from 'webbuilderalphautils'

const tabService = BaseServiceProvider.Service<TabService>('TabService')

tabService.AddTab({
    name: 'Creations',
    path: 'Home/Creations',
    title: 'Creations'
})

console.log(tabService)
</script>

<style lang="scss">
.tabs-layout-tabs{

}
</style>