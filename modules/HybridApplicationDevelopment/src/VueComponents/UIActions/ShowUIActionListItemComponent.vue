<template>
    <div>
        <div v-show="edit">
            <slot>
                
            </slot>
        </div>

        <q-item clickable @click="editAction">
            <q-item-section>
                <q-item-label>
                    {{ action.config.actionIdentifier }}
                </q-item-label>
            </q-item-section>
        </q-item>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const edit = ref(false)
function editAction(){
    edit.value = !edit.value
}
</script>