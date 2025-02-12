<template>
    <div class="filter-input-component">
        <div>
            <slot name="before">

            </slot>
        </div>
        <q-select 
        v-if="options != null && options != undefined"
        dense
        borderless
        :multiple="true"
        v-model="localValue"
        emit-value
        :use-input="true"
        use-chips
        autocomplete="true"
        :options="localOptions"
        @add="addFilter"
        @filter="filterFn"
        @remove="removeFilter"
        type="text">
        <template v-slot:after>
            <q-btn-dropdown  unelevated  dropdown-icon="filter_alt" :auto-close="false">
                <div>
                    <query-filter-builder-component 
                    :chain="chain">
                    </query-filter-builder-component>
                </div>
            </q-btn-dropdown>
        </template>
        
        </q-select>
        <q-select 
        v-else-if="dataType != DataTypes.date && dataType != DataTypes.datetime && dataType != DataTypes.time"
        dense
        borderless
        :multiple="true"
        v-model="localValue"
        
        :use-input="true"
        use-chips
        new-value-mode="add"
        autocomplete="true"
        :hide-dropdown-icon="options == null || options == undefined  ? true : false"
        :options="localOptions"
        @new-value="addNewFilterValue"
        @remove="removeFilter"
        type="text">
            <template v-slot:after>
                <q-btn-dropdown  unelevated  dropdown-icon="filter_alt" :auto-close="false">
                    <div>
                        <query-filter-builder-component 
                        :chain="chain">
                        </query-filter-builder-component>
                    </div>
                </q-btn-dropdown>
            </template>
        
        </q-select>
        <q-select 
        v-else
        dense
        borderless
        :multiple="true"
        v-model="localValue"
    
        :use-input="true"
        use-chips
        new-value-mode="add"
        autocomplete="true"
        :hide-dropdown-icon="options == null || options == undefined  ? true : false"
        :options="localOptions"
        @new-value="addNewFilterValue"
        @remove="removeFilter"
        type="text">
            <template v-slot:after>
                <q-btn-dropdown  unelevated  dropdown-icon="filter_alt" :auto-close="false">
                    <div>
                        <query-filter-builder-component 
                        :chain="chain">
                        </query-filter-builder-component>
                    </div>
                </q-btn-dropdown>
            </template>
        
        </q-select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterChain } from 'alphautils';
import { Filter } from 'alphautils';
import { FilterOperators } from 'alphautils';
import QueryFilterBuilderComponent from './QueryFilterBuilderComponent.vue';
import { DataTypes } from 'alphautils';

const {
    filterChain,
    field,
    options,
    defaults,
    dataType
} = defineProps({
    filterChain: {
        type: FilterChain,
        required: false
    },
    field: {
        type: String,
        required: false
    },
    options: {
        type: Array<string>,
        required: false
    },
    defaults:{
        type: Boolean,
        required: false
    },
    dataType:{
        type: String,
        required: true
    }
})

const emits = defineEmits({
    updateFilter: (filterchain: FilterChain) => true
})
//testChain.addChild(new FilterChain(true, [ new Filter({field:'testfield', key:'Xx',value:'testvalue', operator: FilterOperators.equal})]))
const localValue = ref([])
const localOptions = ref([])
const dateRange = ref(false)

let chain = ref()

function Initialize(){
    if(filterChain != null){
        chain = ref(new FilterChain(filterChain.and, filterChain.filters))
    }else{
        const defaulte = defaults != null ? defaults : false
        chain = ref(new FilterChain(defaulte, []))
    }
    if(options != null){
        localOptions.value = options
    }
}
Initialize()
function addFilter(details: {index:number, value: string}){
    if(details.value != null && details.value != undefined && details.value != ''){
        if(chain.value.filters == null ||chain.value.filters?.find(x => x.value == details.value)?.length == 0){
            const filter = new Filter({field:field, operator:GetOperator(), value: details.value, type: dataType})
            chain.value.addFilter(filter)
            emits('updateFilter', chain)           
        }
    }
}
function addNewFilterValue(value, done){
    if(value != null && value != undefined && value != ''){
        if(chain.value.filters == null ||chain.value.filters?.filter(x => x.value == value)?.length == 0){
            const filter = new Filter({field:field, operator:GetOperator(), value: value, type: dataType})
            chain.value.addFilter(filter)
            emits('updateFilter', chain)
            console.log(chain.value)
           done(value, 'add-unique')
        }
    }
}

function GetOperator(){
    if(options == null || options == undefined){
        return FilterOperators.Equal
    }

    if(dataType == DataTypes.date || dataType == DataTypes.datetime){
        return FilterOperators.Equal
    }
    return FilterOperators.Contains
}
function removeFilter(details:{value:string, index:number}){
    const filterIndex = chain.value.filters.findIndex(x => x.value == details.value)
    if(filterIndex != -1){
        chain.value.filters.splice(filterIndex, 1)
        emits('updateFilter', chain.value)
    }
}
function filterFn (val, update) {
        if (val === '') {
          update(() => {
            localOptions.value = options

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          localOptions.value = options?.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
}
</script>

<style scoped lang="scss">

.filter-input-component{
   
    
}

</style>