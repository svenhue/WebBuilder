<template>

    <div>
        <SelectComponent :options="creationFilterOptions" v-model="creationTypeFilter" label="Creation Type" option-label="name" option-value="value" filled dense class="q-mb-md">
 
        </SelectComponent>

        <div>
            <div dense v-for="item in creationsComputed" :key="item.id" clickable>
                <div-section avatar>
                    <UIcon :name="item.icon" size="2.5rem" class="q-mr-sm" />
                </div-section>
                <div-section>
                    <div-label class="text-h6">{{ item.name }}</div-label>
                    <div-label caption>{{ item.description }}</div-label>
                </div-section>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'

import { DataAdapter } from 'alphautils'
import { ref, computed } from 'vue'

definePageMeta({
  middleware: 'auth'
})
const apps = DataAdapter.getComputed('ApplicationConfiguration')
const creationTypeFilter = ref('Application')

const creationFilterOptions = [
    {
        name: 'Application',
        value: 'ApplicationConfiguration',
    }
]

const creationsComputed = computed(() => {
    switch(creationTypeFilter.value) {
        case 'ApplicationConfiguration':
            return apps
        default:
            return []
    }
    
})

</script>