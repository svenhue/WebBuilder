<template>
    <div>
        <InputComponent v-model="route">

        </InputComponent>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'


import { inject } from 'vue';

const props = defineProps({
    solution: {
        type: Object,
        required: true,
    }
})

const route = inject('solutionRoute_'+ props.solution.sessioncontextid)
</script>