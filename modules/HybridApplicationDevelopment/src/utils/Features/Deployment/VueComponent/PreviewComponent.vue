<template>
    <UIcon size="45px"  name="mdi:play_circle" color="white" class="preview-icon" @click="async () => await service.startPreview()">
        <UTooltip>
            <div> Preview </div>
        </UTooltip>
    </UIcon>
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
    background-color: var(--color-darkgrey)
}
</style>