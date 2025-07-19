<template>
    <div class="tree-path">
        <UBreadcrumb  gutter="xs" class="tree-step">
            
            <UBreadcrumb-el 
            v-for="el in tree" 
            :class="getClass(el)"
            :key="el.id" 
            :label="formatElementTag(el.tag)" 
            @click="$emit('focusView', el.id, true)" 
            >
            </UBreadcrumb-el>
        </UBreadcrumb>
    </div>
</template>

<script setup lang="ts">
import { BaseServiceProvider, IViewConfiguration } from 'alphautils';
import { FocussedViewContextService } from '../../utils/Services/Designer/FocussedViewContextService';

defineEmits(['focusView'])

const service = BaseServiceProvider.Service<FocussedViewContextService>('FocussedViewContextService') as FocussedViewContextService
const tree = service.GetTree();


const formatElementTag = (tag: string) => {
    const formatted = tag
                        .replace('component:', '');
    return formatted
}
function getClass(el: IViewConfiguration){
    if(el.id == service.GetFocussedView()?.value?.id){
        return 'focussed'
    }
    return 'parent'
}

</script>

<style scoped lang="scss">
.tree-path{

    .tree-step{
        cursor: pointer;

        .focussed{
            color: white
        }
        .parent{
            color: white;
        }
    }
}

</style>