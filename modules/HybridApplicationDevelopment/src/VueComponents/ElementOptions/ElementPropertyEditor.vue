<template>
    <div>
        <div label="Propertys">
            <div dense
            v-for="(value, propertyName) in viewProperties" :key="propertyName">
                <div-section>
                    <div-label>{{propertyName}}</div-label>
                </div-section>
                <div-section>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" @update:model-value="(value) => emits('updateElement', 
                    [
                        {
                            key: 'properties' + propertyName,
                            value: value
                        }
                    ])" dense borderless type="text" >
                    </InputComponent>
                </div-section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'


import { computed } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
    view: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['updateElement'])


const viewProperties = computed<object>(() => {
    if(props.view?.value == undefined) return {}
    return JSON.parse(JSON.stringify(props.view?.value.properties))
})


</script>