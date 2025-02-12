<template>
    <div class="tree-path">
        <q-breadcrumbs gutter="sm" class="q-pa-md q-gutter-sm tree-step">
            
            <q-breadcrumbs-el v-for="el in tree" :key="el.id" :label="el.tag" @click="$emit('focusView', el.id, true)" >
            </q-breadcrumbs-el>
        </q-breadcrumbs>
    </div>
</template>

<script setup lang="ts">
import { BaseServiceProvider } from 'alphautils';
import { FocussedViewContextService } from '../../utils/Services/Designer/FocussedViewContextService';

defineEmits(['focusView'])

const service = BaseServiceProvider.Service<FocussedViewContextService>('FocussedViewContextService') as FocussedViewContextService

const tree = service.GetTree();


</script>

<style scoped lang="scss">

.tree-path{
    position:absolute;
    bottom:0px;
    left: 50px;
    width: "min-content";
    z-index: 99999;
    .tree-step{
        cursor: pointer;
    }
}

</style>