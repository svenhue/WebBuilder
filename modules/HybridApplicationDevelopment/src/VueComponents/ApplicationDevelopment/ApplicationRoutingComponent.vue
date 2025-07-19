<template>
    <div>
        <InputComponent
        unelevated
        v-model="path"
        dense
        v-on:keyup.enter="PushRoute"
        >
            <template v-slot:after>
                <ButtonComponent 
                dense
                icon="navigation"
                @click="PushRoute">

                </ButtonComponent>
            </template>
        </InputComponent>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { ref } from 'vue';
import { RouteRecordNormalized } from 'vue-router'

const props = defineProps({
    route:{
        type: Object as () => RouteRecordNormalized,
        required: true,
    
    }
})
const emits = defineEmits(['push'])
const path = ref(props.route.path)

function PushRoute(){
    emits('push', path.value)
}

</script>

<style scoped lang="scss">

</style>