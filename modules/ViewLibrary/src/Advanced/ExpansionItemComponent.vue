<template>
    <q-expansion-item v-bind="view.htmlattributes">
        <MVVMRendererComponent :view="view.children">

        </MVVMRendererComponent>
    </q-expansion-item>
</template>

<script setup lang="ts">
import { ViewElement } from 'alphautils';


const props = defineProps({
    view: {
        type: ViewElement,
        required: true,
    }
})
console.log(props.view)
</script>