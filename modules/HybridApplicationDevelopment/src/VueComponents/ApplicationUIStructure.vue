<template>
    <div class="application-ui-structure">
        <div class="drawer-header">
            Navigator
            <q-btn class="expand-btn" dense unelevated size="10px" 
            :icon="treeExpanded == false ? 'unfold_more' : 'unfold_less' " 
            @click="changeTreeExpand"></q-btn>

            <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
            @click="emits('close')"></q-btn>

        </div>
        <q-tree
        ref="tree"
        :nodes="nodes"
        node-key="id"
        label-key="name"
        v-model:selected="selected"
        children-key="children"
        selected-color="primary"
        dense
        >
        <template v-slot:default-header="prop">
            <div @click="emits('focusView', prop.node.id)">
            {{ prop.node.name }}
            </div>
        </template>
        <template v-slot:default-body="prop">
            
        </template>
        </q-tree>
    </div>
</template>

<script setup lang="ts">
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