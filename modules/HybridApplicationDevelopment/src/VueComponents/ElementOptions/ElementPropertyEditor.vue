<template>
    <div>
        <q-list label="Propertys">
            <q-item dense
            v-for="(value, propertyName) in viewProperties" :key="propertyName">
                <q-item-section>
                    <q-item-label>{{propertyName}}</q-item-label>
                </q-item-section>
                <q-item-section>
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
                </q-item-section>
            </q-item>
        </q-list>
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