<template>
    <div class="appCode">
        <div class="left">
            <div class="drawer-header">
                Code
                <ButtonComponent class="close-btn" dense unelevated size="10px" icon="close" 
                @click="emits('close')"></ButtonComponent>

            </div>
        </div>   
    </div>

</template>


<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

import ResourceEditor from '../../ResourceEditors/ResourceEditor.vue';
import { NodeViewModel } from '../../../ViewModels/NodeViewModel';
import { ref } from 'vue';



const props = defineProps({
    contextid:{
        type: Number,
        required:true
    },
    viewModel:{
        type: NodeViewModel,
        required:false
    }
})
const editNode = ref(false)
const selectedNode = ref()
const emits = defineEmits(['close'])


function edit(node){
    selectedNode.value = node
    editNode.value = true
}


/*
<div>
                <div dense
                v-for="node in viewModel?.getAll()?.value" :key="node"
                >
                    <div>
                        {{ node?.name }}
                    </div>

                    <div side>
                        <q-btn dense icon="menu" unelevated>
                            <div dense menu-anchor="bottom right" autoclose>
                                <div>
                                    <div dense class="codeBtn">
                                        View State
                                    </div>
                                    <div dense class="codeBtn">
                                        Rename
                                    </div dense class="codeBtn">
                                    <div dense class="codeBtn" v-close-popup clickable @click=" edit(node)">
                                        Edit
                                    </div>
                                    <div dense class="codeBtn">
                                        Duplicate
                                    </div>
                                    <div dense class="codeBtn">
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </q-btn>
                    </div>

                </div>
            </div>
 <div  class="right">
            <ResourceEditor v-if="editNode"
                :contextid="props.contextid"
                :view-model="props.viewModel"
                :node="selectedNode">
                
            </ResourceEditor>
        </div>
            */
</script>


<style scoped lang="scss">

.appCode{

    min-width: 300px;
    display:flex;
    .left{
        min-width: 400px;
    }
    .right{
        min-width: 400px;
        margin-top: 40px;
    }
    .codeBtn{

    }

.codeBtn:hover{
    background-color: #f0f0f0;
    cursor: pointer;
}
}



</style>


