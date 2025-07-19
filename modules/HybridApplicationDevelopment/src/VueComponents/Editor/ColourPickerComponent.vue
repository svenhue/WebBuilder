<template>
    
    <InputComponent dense :model-value="color" @update:model-value="(val) => $emit('updateColor', val)" class="alpha-color-picker alpha-input">
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


            <UIcon name="colorize" class="cursor-pointer">
                <UPopover cover transition-show="scale" transition-hide="scale">
                    <template #content>
                    <UColorPicker dense :model-value="color" @update:model-value="(val) => $emit('updateColor', val)">

                    </UColorPicker>
                    </template>
                </UPopover>
            </UIcon>
        </template>
    </InputComponent>

</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'


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