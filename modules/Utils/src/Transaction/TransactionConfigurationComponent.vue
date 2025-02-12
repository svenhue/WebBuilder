<template>
    <div v-if="transaction != undefined">
        <q-list>
            <q-item>
                <q-item-section>
                    <q-item-label>Id</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-input
                    v-model="transaction.id"
                    filled
                    dense
                    disable
                    ></q-input>
                </q-item-section>
                <q-item>
                <q-item-section>
                    <q-item-label>Transaction Root View</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-input
                    v-model="transaction"
                    filled
                    dense
                    ></q-input>
                </q-item-section>

                </q-item>
            </q-item>
        </q-list>
        <q-list>
            <q-item v-for="keyValue in transaction.nvc.keyValuePairs" :key="keyValue">
                <q-item-section>    
                    <q-item-label>Key</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-input
                    v-model="keyValue.key"
                    filled
                    dense
                    ></q-input>
                </q-item-section>
                <q-item-section>
                    <q-item-label>Value</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-input
                    v-model="keyValue.value"
                    filled
                    dense
                    ></q-input>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useModellingStore } from '../stores/useModellingStore';
import { IViewElement } from '../View/IViewElement.js';

const props = defineProps({
    focussedElementId: {
        type: Number,
        required: true
    }
})

const currentElement = computed<IViewElement>(() => {
    return useModellingStore().getFirstFocussedElement(useModellingStore().currentcontext).value;
})

const transaction = currentElement.value.getTransaction();


</script>