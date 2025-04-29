<template>
    <div>
        <q-select label="Source" v-model="model.source" @update:model-value="(val) => model.setSource(val.value)" :options="sources" option-value="value" option-label="name">

        </q-select>
        
        <GithubRemoteComponent v-show="model.source != undefined" @update-property="(val) => model.setProperty(val)"></GithubRemoteComponent>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import GithubRemoteComponent from './GithubRemoteComponent.vue';


const model = reactive()

const sources = [
    {
        name: 'Github',
       
    }
]

defineExpose({
    getModel(){
        return model
    }
})

</script>