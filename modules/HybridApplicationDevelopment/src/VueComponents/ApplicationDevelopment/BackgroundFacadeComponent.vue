<template>
    <div :style="style" id="editor-background-facade" class="editor-background-facade">    
            <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { BaseServiceProvider } from 'alphautils';
import { GlobalVariableDataProvider } from 'src/utils/Application/GlobalsVariableProvider/GlobalVariableDataProvider';
import { reactive, onMounted } from 'vue';

const props = defineProps({
    contextid:{
        required: true
    }
})

const style = reactive({
   width: '',
   height: ''
})

function ChangeFacadeStyle(newStyle: object){
    style.width = newStyle.width 
    style.height = newStyle.height 
}

defineExpose({
    ChangeFacadeStyle
})

onMounted(() => {
    const serviceProvider = new BaseServiceProvider(props.contextid)
    const varProvider = BaseServiceProvider.ServiceWithContext<GlobalVariableDataProvider>('GlobalVariableDataProvider', props.contextid)

    ChangeFacadeStyle({width: varProvider.GetVariable(props.contextid, 'defaultDesktopWidth'), height: varProvider.GetVariable(props.contextid, 'defaultDesktopHeight')})
})



/*

<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="background-facade">
    <defs>
    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="lightblue" stroke-width="0.5"/>
    </pattern>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
    <rect width="100" height="100" fill="url(#smallGrid)"/>
    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="lightblue" stroke-width="1"/>
    </pattern>
</defs>
<rect width="20000px" height="20000px" fill="url(#grid)" />
        </svg>
*/
</script>

<style scoped lang="scss">

.editor-background-facade{
    overflow:scroll;
    overflow-block: scroll;
    background-color: 'white';
    min-width: 200px;
    position: inherit;
                    left: 50%;
                    transform: translate(-50%);
    .background-facade{ 


    }
}


</style>

