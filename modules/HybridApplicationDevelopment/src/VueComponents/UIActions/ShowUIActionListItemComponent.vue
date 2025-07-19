<template>
    <div>
        <div v-show="edit">
            <slot>
                
            </slot>
        </div>

        <div clickable @click="editAction">
            <div-section>
                <div-label>
                    {{ action.config.actionIdentifier }}
                </div-label>
            </div-section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const edit = ref(false)
function editAction(){
    edit.value = !edit.value
}
</script>