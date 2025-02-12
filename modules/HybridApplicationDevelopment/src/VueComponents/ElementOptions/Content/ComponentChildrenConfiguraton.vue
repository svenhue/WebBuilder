<template>

    <div>
        <q-tree
        ref="tree"
        :nodes="nodes"
        node-key="id"
        label-key="name"
        v-model:selected="selected"
        children-key="children"
        selected-color="primary"
        dense
        >
        <template v-slot:default-header="prop">
            <div>
            {{ prop.node.name }}
            <q-btn icon="add" dense @click="() => openAddDialog(prop.node)">
            </q-btn>
            <q-btn icon="delete" dense @click="() => DeleteNode(prop.node)">
            </q-btn>
            </div>
        </template>
        <template v-slot:default-body="prop">
            
        </template>
        </q-tree>
   


        <div v-show="showDialog" :style="{zIndex: 999999, width: '200px', height: '200px', position: 'absolute', backgroundColor:'white'}">
            <div>
                <q-select dense 
                :options="ViewConfigurationService.getAvaibleComponentTypes()?.filter(
                    v => ['viewdefinition:Basic:ListItemComponent', 'viewdefinition:Navigation:LinkComponent', 'viewdefinition:Navigation:DropdownMenuComponent'].includes(v))" 
                
                :model-value="newComponent.type" @update:model-value="(type) => setComponent(type)">
                </q-select>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import { IViewConfiguration } from 'alphautils';
import { ViewConfigurationService } from '../../../utils/Services/ViewConfigurationService';
import { RunTimeVueApplicationViewModel } from '../../../ViewModels/RuntimeVueApplicationViewModel';
import { h, inject, reactive, ref, computed, MaybeRefOrGetter } from 'vue';
import {  QBtn } from 'quasar';


const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    },
    label: {
        type: String,
        required: false
    }
})
const showDialog = ref(false);
const selected = ref();


const newComponent = reactive({
    type: '',
    id: ''
})

const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel;

const viewGetter = inject('viewGetter_' + props.currentElement.contextid) as (viewId: number) => { view: MaybeRefOrGetter<IViewConfiguration>, children: MaybeRefOrGetter<Array<IViewConfiguration>>}

function setComponent(type: string){
    const newComponent =  viewModel.createElement(type)[0]
    newComponent.parentId = props.currentElement.id;
    viewModel.AddRawViewElement(newComponent);
    showDialog.value = false;
}

const nodes = computed(() => {
    return [getNodeWithChildren(props.currentElement.id, props.currentElement.contextid)];
})
function getNodeWithChildren(nodeId: number, contextId: number) {
    const { view, children } = viewGetter(nodeId);

    if(view?.value == undefined){
        return {id: -1};
    }

    const node = JSON.parse(JSON.stringify(view.value));

    if (children != undefined && children?.value?.length > 0) {
        node.children = children?.value?.map(child => {
            return getNodeWithChildren(child.id, contextId);
        });
    }
    return node;
}

function DeleteNode(node: IViewConfiguration){
    viewModel.DeleteElement(node.id);
}

function openAddDialog(node: IViewConfiguration){
    showDialog.value = true;
}
</script>