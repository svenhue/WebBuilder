<template>
    <div>
        <q-list>
            <q-item dense
            v-for="item in history.undoStack">

                <q-item-section side>
                    <q-icon name="history"></q-icon>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        {{item}}
                    </q-item-label>
                    <q-item-label caption>
                        {{item}}
                    </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn dense icon="delete"></q-btn>
                </q-item-section>
            </q-item>

        </q-list>
    </div>
</template>


<script setup lang="ts">
import { BaseServiceProvider, BORepository } from 'alphautils';
import { computed, watch } from 'vue';


const props = defineProps({
    contextid: {
        type: Number,
        required: true
    }
})

const boRepository = BaseServiceProvider.ServiceWithContext<BORepository>('BORepository', props.contextid)

const history = computed(() => {
    return boRepository.GetHistoryComputed(props.contextid).value
})

</script>
