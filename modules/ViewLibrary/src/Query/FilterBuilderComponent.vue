<template>
    <div>
        <div class="filter-builder">
            <q-select
            dense
            borderless
            @update:model-value="(value) => filter.ChangeOperator(value)"
            v-model="filter.operator"
            :options="Object.values(FilterOperators)">
            </q-select>

            <q-select 
            v-if="(filter.operator == FilterOperators.In || filter.operator == FilterOperators.NotIn)
                        &&( filter.type != DataTypes.date && filter.type != DataTypes.datetime && filter.type != DataTypes.time)"
            dense
            borderless
            :multiple="true"
            v-model="filter.value"
            :use-input="true"
            use-chips
            autocomplete="true"
            :hide-dropdown-icon="options == null || options == undefined  ? true : false"
            :options="localOptions"
            @new-value="addArrayValue"
            @remove="removeArrayValue"
            type="text">
            </q-select>
            <q-input
            v-else-if="(filter.type != DataTypes.date && filter.type != DataTypes.datetime && filter.type != DataTypes.time 
            && filter.type != DataTypes.dateRange)
            && [FilterOperators.EndsWith, FilterOperators.StartsWith, FilterOperators.Equal,
            FilterOperators.Greater, FilterOperators.GreaterOrEqual, FilterOperators.Less, FilterOperators.LessOrEqual,
            FilterOperators.StartsWith, FilterOperators.NotEqual, FilterOperators.Contains].includes(filter.operator)"
            v-model="filter.value">

            </q-input>
            <div v-else-if="(filter.type != DataTypes.date && filter.type != DataTypes.time && filter.type != DataTypes.datetime)
            && filter.operator == FilterOperators.Between">
                <q-input
                dense borderless
                v-model="deleteFirst">

                </q-input>
                <q-input
                dense borderless
                v-model="deleteSecond">

                </q-input>
            </div>
            <q-input 
            v-else-if="(filter.type == DataTypes.date || filter.type == DataTypes.datetime) 
                     && filter.operator == FilterOperators.Between"
            filled :model-value="`${filter.value.from} - ${filter.value.to}`">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="filter.value" range>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
            <q-input v-else-if="filter.type == DataTypes.date && filter.operator != FilterOperators.Between 
            && filter.operator != FilterOperators.In && filter.operator != FilterOperators.NotIn" 
            v-model="filter.value">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filter.value">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
            </q-input>
        <q-input v-else-if="filter.type == DataTypes.datetime  && filter.operator != FilterOperators.Between 
        && filter.operator != FilterOperators.In && filter.operator != FilterOperators.NotIn" 
         filled v-model="filter.value">
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filter.value" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>

            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="filter.value" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                    </div>
                    </q-time>
                </q-popup-proxy>
                </q-icon>
            </template>
            </q-input>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { Filter } from 'alphautils';
import { FilterOperators } from 'alphautils';
import { DataTypes } from 'alphautils';

const {
    initialFilter,
    options
} = defineProps({
    initialFilter: {
        type: Filter,
        required: false
    },
    options:{
        type: Array<string>,
        required: false
    }
})
const emits = defineEmits({
    updateFilter: (filter: Filter) => true
})
let filter = ref<Filter>(null)
const deleteFirst = ref()
const deleteSecond = ref()  
const localOptions = ref<string[]>([])
function Initialize(){
    console.log(initialFilter)
    if(initialFilter != null){
        filter = ref(initialFilter)
    }else{
        filter = ref(new Filter({
            field: '',
            operator: FilterOperators.Equal,
            value: ''
            
        }))
    }
    if(options != null){
        localOptions.value = options
    }

}
function addArrayValue(value: string, done){
    if(!filter.value.value.includes(value)){
        filter.value.value.push(value)
        done(value, 'add-unique')
    }
}
function removeArrayValue(value){
    filter.value.value.splice(filter.value.value.indexOf(value), 1)}
Initialize()

watch(filter, (old, newv) => {
    
})

</script>

<style lang="scss">
.filter-builder{
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

</style>