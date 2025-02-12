<template>
    <q-form dense>
        <q-input
        v-model="search"
        type="search"
        :debounce="500"
        :placeholder="view?.content.placeholder"
        ></q-input>

        <q-btn
        :label="view?.content.buttonText"
        :loading="loading"
        @click="search"
        ></q-btn>

    </q-form>
</template>

<script setup lang="ts">

import { ViewElement } from 'alphautils';
import { onMounted, onUnmounted, ref } from 'vue';
import { useViewConfiguration } from 'alphautils';




</script>