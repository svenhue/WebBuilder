<template>
    <div class="left-development-options-bar">
        <q-list dense :style="{width: '40px', height: '1000px'}" > 
        <q-item  class="ldob-content-btn" dense>
            <q-btn dense icon="add_circle_outline" @click="(e) => update(e, 'palette')">

            </q-btn>
        </q-item>
         <q-item  class="ldob-content-btn" dense>
            <q-btn dense icon="smart_toy" @click="(e) => update(e, 'aichat')">

            </q-btn>
        </q-item>
        <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="notes" @click="(e) => update(e, 'structure')">

            </q-btn>
        </q-item>
        <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="pageview" @click="(e) => update(e, 'pages')">
            
            </q-btn>
        </q-item>
        <q-separator color="black" ></q-separator>
        
        <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="code" @click="(e) => update(e, 'code')">

            </q-btn>
        </q-item>

        <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="style" @click="(e) => update(e, 'style')">

            </q-btn>
        </q-item>

        <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="account_tree" @click="(e) => update(e, 'workflows')">

            </q-btn>
        </q-item>
        <q-separator color="black"></q-separator>
                <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="manage_history" @click="(e) => update(e, 'history')">

            </q-btn>
        </q-item>
        <q-separator color="black" ></q-separator>
                <q-item dense class="ldob-content-btn">
            <q-btn dense unelevated icon="settings" @click="(e) => update(e, 'settings')">

            </q-btn>
        </q-item>
        </q-list>
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

<script setup lang="ts">
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
    color: theme('colors.fontwhite');
    border-right: 1px solid #e0e0e0;
    background-color: theme('colors.primary-dark');
    z-index: 999;

    .ldob-content-btn{
        margin-left: -12px
    }
    .ldob-content{
        position:absolute;
        height: 100%;
        left: 40px;
        top:0;
        color: black;
        z-index: 100;
        background-color: theme('colors.darkgrey');
        border: 1px solid black;
    }
}
</style>