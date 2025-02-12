

<template>
    <q-table 
    grid 
    :columns="columns"
    :rows="avaibleTemplates">
        <template v-slot:item="props" >
            <MarketItem :style="{minWidth: '250px'}" :item="props.row"/>
        </template>
    </q-table>

</template>

<script async setup lang="ts">
import { BaseServiceProvider, HTTPClientService, IDataAdapter, IHTTPClientService } from 'alphautils';
import { interfaces } from 'inversify';
import { UITemplateService } from '../VueComponents/ApplicationDevelopment/Features/Templates/UITemplateService';
import MarketItem from './MarketItem.vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})
const columns = [
  {
    name: 'desc',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
]

const service = new UITemplateService(
    BaseServiceProvider.ServiceWithContext<interfaces.Newable<IDataAdapter>>("DataAdapterConstructor",0),
    BaseServiceProvider.ServiceWithContext<IHTTPClientService>("HTTPClientService",0)
)
 
const avaibleTemplates = ref([])

onMounted(async () => {
    await SetTemplates()
})

async function SetTemplates(){
    avaibleTemplates.value = await service.GetPublicTemplates();
    console.log(avaibleTemplates.value)
}

</script>