<template>
    <q-icon size="45px"  name="play_circle" color="white" class="preview-icon" @click="async () => await service.startPreview()">
        <q-tooltip>
            <div> Preview </div>
        </q-tooltip>
    </q-icon>
</template> 


<script setup lang="ts">
import { ApplicationPreviewService } from '../ApplicationPreviewService';


const service = new ApplicationPreviewService()
</script>

<style scoped lang="scss">


.preview-icon{
    cursor: pointer;
    
}

.preview-icon:hover{
    background-color: theme('colors.darkgrey')
}
</style>