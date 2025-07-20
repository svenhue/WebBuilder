<template>
    <div>
        <UButton dense label="Bundle" icon="download" @click="emits('downloadBundle')">
        </UButton>
        <br />
        <UButton dense label="Project" icon="download"  @click="emits('downloadProject')">

        </UButton>
        <UButton dense label="Config" icon="download" @click="emits('downloadConfig')">

        </UButton>
    </div>
</template>


<script setup lang="ts">


const emits = defineEmits(['downloadBundle', 'downloadProject', 'downloadConfig'])

</script>