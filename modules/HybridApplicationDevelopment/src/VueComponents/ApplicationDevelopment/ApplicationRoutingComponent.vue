<template>
    <div>
        <q-input
        unelevated
        v-model="path"
        dense
        v-on:keyup.enter="PushRoute"
        >
            <template v-slot:after>
                <q-btn 
                dense
                icon="navigation"
                @click="PushRoute">

                </q-btn>
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
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