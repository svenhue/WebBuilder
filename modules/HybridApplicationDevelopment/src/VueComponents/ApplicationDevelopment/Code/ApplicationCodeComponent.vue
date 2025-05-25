<template>
    <div class="appCode">
        <div class="left">
            <div class="drawer-header">
                Code
                <q-btn class="close-btn" dense unelevated size="10px" icon="close" 
                @click="emits('close')"></q-btn>

            </div>
            
            <q-btn-dropdown dense>

            </q-btn-dropdown>

        

        </div>
       
    </div>

</template>


<script setup lang="ts">
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
<q-list>
                <q-item dense
                v-for="node in viewModel?.getAll()?.value" :key="node"
                >
                    <q-item-section>
                        {{ node?.name }}
                    </q-item-section>

                    <q-item-section side>
                        <q-btn dense icon="menu" unelevated>
                            <q-menu dense menu-anchor="bottom right" autoclose>
                                <q-list>
                                    <q-item dense class="codeBtn">
                                        View State
                                    </q-item>
                                    <q-item dense class="codeBtn">
                                        Rename
                                    </q-item dense class="codeBtn">
                                    <q-item dense class="codeBtn" v-close-popup clickable @click=" edit(node)">
                                        Edit
                                    </q-item>
                                    <q-item dense class="codeBtn">
                                        Duplicate
                                    </q-item>
                                    <q-item dense class="codeBtn">
                                        Delete
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-item-section>

                </q-item>
            </q-list>
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


