<template>
    <div class="sedc">
        <div :style="{display:'inline-flex', alignItems:'center'}">
            <div class="small-block-header">
                Opacity
            </div>
     
                <q-slider
                v-model="styles.opacity">

                </q-slider>
                <q-input type="number" dense v-model="styles.opacity">

                </q-input>
      

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const styles= reactive({
    mixBlendingMode: '',
    opacity: 0,
    outline:''
})

</script>

<style scoped lang="scss">

</style>