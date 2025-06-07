<template>
    
    <q-input dense :model-value="color" @update:model-value="(val) => $emit('updateColor', val)" class="alpha-color-picker alpha-input">
        <template v-slot:before>
            <div class="editor-input-label" :style="{color: 'white!important'}">
                {{ label }}
            </div>
        </template>
        <template v-slot:after>

            <div :style="{
                width: '20px',
                height: '20px',
                backgroundColor: color,
            }">

            </div>


            <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color dense :model-value="color" @update:model-value="(val) => $emit('updateColor', val)">

                    </q-color>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>

</template>

<script setup lang="ts">

defineProps({
    color: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    }
})

defineEmits(['updateColor'])

</script>

<style lang="scss">

.alpha-color-picker{
    color:white;
}
</style>