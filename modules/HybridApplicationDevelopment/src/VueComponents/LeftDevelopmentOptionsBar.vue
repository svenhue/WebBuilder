<template>
    <div class="left-development-options-bar">
        <div dense :style="{width: '40px', height: '1000px'}" > 
        <div  class="ldob-content-btn" dense>
            <ButtonComponent dense icon="mdi:add-circle" @click="(e) => update(e, 'palette')">

            </ButtonComponent>
        </div>
         <div  class="ldob-content-btn" dense>
            <ButtonComponent dense icon="smart_toy" @click="(e) => update(e, 'aichat')">

            </ButtonComponent>
        </div>
        <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:notes-search" @click="(e) => update(e, 'structure')">

            </ButtonComponent>
        </div>
        <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:pageview" @click="(e) => update(e, 'pages')">
            
            </ButtonComponent>
        </div>
        
        <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:code" @click="(e) => update(e, 'code')">

            </ButtonComponent>
        </div>

        <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:style" @click="(e) => update(e, 'style')">

            </ButtonComponent>
        </div>

        <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="account_tree" @click="(e) => update(e, 'workflows')">

            </ButtonComponent>
        </div>
                <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:source-branch" @click="(e) => update(e, 'history')">

            </ButtonComponent>
        </div>
                <div dense class="ldob-content-btn">
            <ButtonComponent dense unelevated icon="mdi:settings-outline" @click="(e) => update(e, 'settings')">

            </ButtonComponent>
        </div>
        </div>
        <div class="ldob-content"
        v-show="tab != ''">
            <UIComponentPalette
            @add-component="addComponent"
            @close="tab = ''"
            v-show="tab == 'palette'">

            </UIComponentPalette>
            <AgenticChatIntegrationComponent
            @focusView="emits('focusView', $event)"
            @close="tab = ''"
            v-show="tab == 'aichat'"
            >

            </AgenticChatIntegrationComponent>
            <ApplicationUIStructure
            @focusView="emits('focusView', $event)"
            @close="tab = ''"
            v-show="tab == 'structure'">

            </ApplicationUIStructure>
            <ApplicationPagesComponent
            :contextid="contextid"
            @close="tab = ''"
            v-show="tab == 'pages'">

            </ApplicationPagesComponent>
            <ApplicationStyleComponent
            :contextid="contextid"
            @close="tab = ''"
            v-show="tab == 'style'">
            </ApplicationStyleComponent>
            <ApplicationCodeComponent
            :viewModel="viewModel._codeViewModel"
            @close="tab = ''"
            :contextid="contextid"
            v-show="tab == 'code'">
            >
            </ApplicationCodeComponent>
            <ContextVariablesComponent
            @close="tab = ''"
            v-show="tab == 'variables'"
            :contextid="contextid">

            </ContextVariablesComponent>
            <ApplicationSettingsComponent
            @close="tab = ''"
            v-show="tab == 'settings'"
            :contextid="contextid">

            </ApplicationSettingsComponent>
            
            <StateHistoryComponent 
            @close="tab = ''"
            v-show="tab == 'history'"
            :contextid="contextid">
            </StateHistoryComponent>
        </div>
    </div>
</template>

<script setup lang="ts">import { ButtonComponent } from 'alphaviewlibrary'

import UIComponentPalette from './UIComponentPalette.vue';
import ApplicationUIStructure from './ApplicationUIStructure.vue';
import { ref } from 'vue'
import ApplicationPagesComponent from './ApplicationDevelopment/ApplicationPagesComponent.vue';
import ContextVariablesComponent from './ApplicationDevelopment/ContextVariablesComponent.vue';
import ApplicationSettingsComponent from './ApplicationDevelopment/ApplicationSettingsComponent.vue';
import StateHistoryComponent from './ApplicationDevelopment/StateHistoryComponent.vue';
import ApplicationCodeComponent from './ApplicationDevelopment/Code/ApplicationCodeComponent.vue';
import { RunTimeVueApplicationViewModel } from '../ViewModels/RuntimeVueApplicationViewModel';
import AgenticChatIntegrationComponent from '../Agentic/AgenticChatIntegrationComponent.vue';
import ApplicationStyleComponent from './ApplicationDevelopment/ApplicationStyleComponent.vue';

defineProps({
    contextid: {
        type: Number,
        required: true
    },
    viewModel: {
        type: RunTimeVueApplicationViewModel,
        required: true
    }   
})

const tab = ref('')
const emits = defineEmits(['addComponent', 'focusView'])

function update(e, s: string){
    e.stopPropagation();
    e.preventDefault();
    if(tab.value == s){
        tab.value = ''
        return
    }
    tab.value = s;    
}

function addComponent(e: Event, type: string){
    emits('addComponent', e, type)
}
function CloseAllTabs(){
    tab.value = ''
}

defineExpose({
    CloseAllTabs
})
</script>

<style scoped lang="scss">
.left-development-options-bar{
    color: white!important;
    top: 1;
    left: 0;
    height: 100%;
    color: var(--colors-fontwhite);
    border-right: 1px solid #e0e0e0;
    background-color: var(--color-primary-dark);
    z-index: 999;

    .ldob-content-btn{
        
    }
    .ldob-content{
        position:absolute;
        height: 100%;
        left: 40px;
        top:0;
        color: black;
        z-index: 100;
        background-color: var(--color-darkgrey);
        border: 1px solid black;
    }
}
</style>