<template>
    <div>
        <q-input v-model="route">

        </q-input>
    </div>
</template>

<script setup lang="ts">
import { SolutionObject } from 'alphautils';
import { inject } from 'vue';

const props = defineProps({
    solution: {
        type: SolutionObject,
        required: true,
    }
})

const route = inject('solutionRoute_'+ props.solution.sessioncontextid)
</script>