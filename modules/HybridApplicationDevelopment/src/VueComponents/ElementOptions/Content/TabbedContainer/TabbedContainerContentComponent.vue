<template>
    <div>
        <div>
            Tabs
            <ButtonComponent dense icon="mdi:add" @click="add()
            
            "></ButtonComponent>
        </div>
        <div>
            <div dense v-for="child in children" :key="child.id">
                <div><InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense @update:model-value="(val) => viewModel.PartialUpdateView(child.id, {keyValuePairs:[{key: 'properties.label', value: val}]})" :model-value="child.properties?.label" > </InputComponent> </div>
                <div side>
                    <UIcon name="close" @click="viewModel.DeleteElement(child.id)"></UIcon>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

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