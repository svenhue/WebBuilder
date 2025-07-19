<template>

    <div>
        <q-select :options="creationFilterOptions" v-model="creationTypeFilter" label="Creation Type" option-label="name" option-value="value" filled dense class="q-mb-md">
 
        </q-select>

        <q-list>
            <q-item dense v-for="item in creationsComputed" :key="item.id" clickable>
                <q-item-section avatar>
                    <UIcon :name="item.icon" size="2.5rem" class="q-mr-sm" />
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-h6">{{ item.name }}</q-item-label>
                    <q-item-label caption>{{ item.description }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </div>

</template>


<script setup lang="ts">
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