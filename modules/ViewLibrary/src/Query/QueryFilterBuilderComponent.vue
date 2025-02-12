<template>
    <div>
        <q-tree
        :nodes="[localChain]"
        :default-expand-all="true"
        node-key="key"
        children-key="subChains"
        >
        <template v-slot:default-header="props">
            <div>
                <q-option-group
                :inline="true"
                v-model="props.node.and"
                :options="[{
                    label: 'and',
                    value: true
                }, {
                    label: 'or',
                    value: false
                }]">

                </q-option-group>

            </div>
        </template>
        <template v-slot:default-body="props">
            <div :style="{display:'inline-flex'}">
                    <q-btn dense unelevated @click.stop="addFilter(props.node)"
                    label="Add Filter">

                    </q-btn>
                    <q-btn dense unelevated @click.stop="addChain(props.node)"
                    label="Add Chain">

                    </q-btn>
                </div>
            <FilterBuilderComponent
            v-for="filter in props.node.filters" :key="filter.key"
            :initial-filter="filter">

            </FilterBuilderComponent>
        </template>

        </q-tree>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { FilterChain } from 'alphautils';
import FilterBuilderComponent from './FilterBuilderComponent.vue';
import { Filter } from 'alphautils';
import { FilterOperators } from 'alphautils';

const {
    chain
} = defineProps({
    chain: {
        type: FilterChain,
        required: false
    }
})

const localChain = ref<FilterChain>(null)
    Initialize()

localChain.value.key = 'root'

function Initialize(){
    console.log(chain)
    if(chain != null){
        localChain.value = chain
    }else{
        localChain.value = new FilterChain(false, [])
    }
}
function addFilter(node: FilterChain){
    node.addFilter(new Filter({operator: FilterOperators.Equal, field: '', value: ''}))
}
function addChain(node: FilterChain){
    node.addChild(new FilterChain(false, []))
}
</script>
