<template>
    <div class="application-ui-structure">
        <div class="drawer-header">
            Navigator
            <UButton class="expand-btn" dense unelevated size="10px" 
            :icon="treeExpanded == false ? 'mdi:unfold-less-horizontal' : 'unfold_less' " 
            @click="changeTreeExpand"></UButton>

            <UButton class="close-btn" dense unelevated size="10px" :icon="'mdi:close-circle'" 
            @click="emits('close')"></UButton>

        </div>
        <UTree
        :items="nodes"
        valueKey="id"
        labelKey="name"
        v-model="selected"
        >
            <template #item="{item}">
                     <div @click="emits('focusView', item.id)">
            {{ item.name }}
            </div>
            </template>
        </UTree>
    </div>
</template>

<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

import { BaseServiceProvider } from 'alphautils';
import { FocussedViewContextService } from '../utils/Services/Designer/FocussedViewContextService';
import {  ref } from 'vue';
//  @update:selected="() =>/* viewmodel.focusView(s.id, useModellingStore().currentcontext)*/"
const emits = defineEmits(['close', 'focusView'])
const tree  = ref(null)

const treeExpanded = ref(false)

const service = BaseServiceProvider.Service<FocussedViewContextService>('FocussedViewContextService') as FocussedViewContextService
const selected = ref(null)
const nodes = service.GetApplicationTree();
function changeTreeExpand(){
    treeExpanded.value = !treeExpanded.value
    if(treeExpanded.value == true){
        tree.value.collapseAll()
    }else{
        tree.value.expandAll()
    }
}
</script>

<style scoped lang="scss">
.application-ui-structure{
    width: max-content;
    height: 100%;
    border: 1px solid black
    
}

</style>