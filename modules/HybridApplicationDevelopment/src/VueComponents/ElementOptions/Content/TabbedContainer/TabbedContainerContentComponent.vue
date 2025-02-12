<template>
    <div>
        <div>
            Tabs
            <q-btn dense icon="add" @click="add()
            
            "></q-btn>
        </div>
        <q-list>
            <q-item dense v-for="child in children" :key="child.id">
                <q-item-section><q-input dense @update:model-value="(val) => viewModel.PartialUpdateView(child.id, {keyValuePairs:[{key: 'properties.label', value: val}]})" :model-value="child.properties?.label" > </q-input> </q-item-section>
                <q-item-section side>
                    <q-icon name="close" @click="viewModel.DeleteElement(child.id)"></q-icon>
                </q-item-section>

            </q-item>
        </q-list>
    </div>
</template>

<script setup lang="ts">
import { IViewConfiguration, useViewConfiguration } from 'alphautils';
import { RunTimeVueApplicationViewModel } from 'src/ViewModels/RuntimeVueApplicationViewModel';
import { inject } from 'vue';


const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const viewModel = inject("applicationViewModel") as RunTimeVueApplicationViewModel

function add(){
    viewModel.AddRawViewElement({
        type: 'viewdefinition:Structure:ContainerComponent',
        tag: "component:ContainerComponent",
        parentId: props.currentElement.id,
        properties:{
            label: 'New Tab'
        }
    })
}

const { view, children } = useViewConfiguration(props.currentElement.contextid, props.currentElement.id);
</script>