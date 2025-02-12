<template>
        <div class="layout-placeholder"    id="XXX">

        </div>
  
</template>

<script setup lang="ts">
import { ref} from 'vue';

const props = defineProps({
    contextid: {
        type: Number,
        required:true
    }
})

const container = ref(null)
const developmentModuleRef = ref(null)

function deleteFocussedView(){
    developmentModuleRef.value.deleteFocussedView()
}





</script>

<style lang="scss">
.main-development-layout{
    width: 100%;
  
    position: absolute;
   
    overflow: clip;
    
    .mdl-drawer{
       
        z-index: 100;
    }
    .layout-placeholder{
      
    }
    #development-container{
        width: 100%;
     
       
        overflow: clip;
    }
}

</style>