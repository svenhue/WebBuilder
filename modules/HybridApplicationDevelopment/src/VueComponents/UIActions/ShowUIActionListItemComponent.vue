<template>
    <div>
        <div v-show="edit">
            <slot>
                
            </slot>
        </div>

        <div clickable @click="editAction">
            <div>
                <div>
                    {{ action.config.actionIdentifier }}
                </div>
            </div>
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