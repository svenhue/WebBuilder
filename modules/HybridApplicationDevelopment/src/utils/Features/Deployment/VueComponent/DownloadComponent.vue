<template>
    <div>
        <q-btn dense label="Bundle" icon="download" @click="emits('downloadBundle')">
        </q-btn>
        <br />
        <q-btn dense label="Project" icon="download"  @click="emits('downloadProject')">

        </q-btn>
        <q-btn dense label="Config" icon="download" @click="emits('downloadConfig')">

        </q-btn>
    </div>
</template>


<script setup lang="ts">

const emits = defineEmits(['downloadBundle', 'downloadProject', 'downloadConfig'])

</script>