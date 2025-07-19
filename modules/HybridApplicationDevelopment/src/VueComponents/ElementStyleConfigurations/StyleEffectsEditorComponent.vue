<template>
    <div class="sedc">
        <div :style="{display:'inline-flex', alignItems:'center'}">
            <div class="small-block-header">
                Opacity
            </div>
     
                <USlider
                v-model="styles.opacity">

                </USlider>
                <InputComponent type="number" dense v-model="styles.opacity">

                </InputComponent>
      

        </div>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'

import { reactive } from 'vue';

const styles= reactive({
    mixBlendingMode: '',
    opacity: 0,
    outline:''
})

</script>

<style scoped lang="scss">

</style>