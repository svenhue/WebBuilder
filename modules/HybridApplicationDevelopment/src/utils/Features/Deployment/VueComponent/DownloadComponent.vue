<template>
    <div>
        <ButtonComponent dense label="Bundle" icon="download" @click="emits('downloadBundle')">
        </ButtonComponent>
        <br />
        <ButtonComponent dense label="Project" icon="download"  @click="emits('downloadProject')">

        </ButtonComponent>
        <ButtonComponent dense label="Config" icon="download" @click="emits('downloadConfig')">

        </ButtonComponent>
    </div>
</template>


<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'


const emits = defineEmits(['downloadBundle', 'downloadProject', 'downloadConfig'])

</script>