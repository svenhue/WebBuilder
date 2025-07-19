<template>
    <CardComponent class="edit-event-handler">
        <div>
            Edit Event Handler
            <button class="custom-button custom-button--flat" @click="$emit('close')" :style="{
                position: 'absolute',
                right: '10px',
                top: '10px'
            }">
                <i class="material-icons">cancel</i>
            </button>
        </div>
        <q-separator></q-separator>
        <div>
            Event
            <SelectComponent
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            :options="Object.values(UIEventTypes)"
            
            @update:model-value="(value) => { eventCopy.type = value, $emit('updateEvent',eventCopy)} "
            :model-value="eventCopy.type"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Event Type </div>
                </template>
            </SelectComponent>
            <SelectComponent
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            dense
            :model-value="eventCopy?.identifier"
                :options="eventCopy.type == UIEventTypes['domEvent'] ? Object.values(UIEvents) : GetCustomComponentEvents(element.publicidentifier)"
                @update:model-value="(value) => {eventCopy.identifier = value, $emit('updateEvent',eventCopy)}"
            >
                <template v-slot:before>
                    <div class="editor-input-label"> Trigger </div>
                </template>
            </SelectComponent>
        </div>
        <q-separator></q-separator>
        <div>
            Actions
            <button class="custom-button custom-button--flat" @click="addAction()" :style="{
                position: 'absolute',
                right: '10px',
                top: '10px',
                marginBottom: '10px'
            }">
                <i class="material-icons">add</i>
            </button>
            <q-separator></q-separator>
            <q-list>
                <q-item v-for="action in eventCopy.actions" :key="action">
                    <q-item-section>
                        <EditActionComponent
                        @update-action="(action) => UpdateOrSaveAction(action)"
                        @delete-action="(action) => DeleteAction(action)"
                        :contextid="contextid"
                        :action="action">

                        </EditActionComponent>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <div >
            <q-separator>

            </q-separator>
            <div >
                <div id="jfiopqehf73408956234">
                    </div>
            </div>
        </div>
    </CardComponent>
</template>


<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { CardComponent } from 'alphaviewlibrary'

import { IDataAdapter, IUIEvent, IViewConfiguration, UIActionTypes,UIEventTypes, UIEvents, RestrictedServiceProvider, BOService, IUIAction  } from 'alphautils';
import { BaseServiceProvider } from 'alphautils';
import { ViewDefinition } from '../../utils/Models/ViewDefinition';
import { ref } from 'vue';
import { interfaces } from 'inversify';
import EditActionComponent from './EditActionComponent.vue';
import { identifier } from '@babel/types';

const props = defineProps({
    event: {
        type: Object as () => IUIEvent,
        required: true
    },
    contextid:{
        type: Number,
        required: true
    },
    element:{
        type: Object as () => IViewConfiguration,
        required: true
    }
})
const emits = defineEmits(['updateEvent', 'close'])


const eventCopy = ref<IUIEvent>(JSON.parse(JSON.stringify(props.event)))

if(eventCopy.value.actions == undefined){
    eventCopy.value.actions = []
}

const dataAdapterConstructor = BaseServiceProvider.ServiceWithContext<interfaces.Newable<IDataAdapter>>('DataAdapterConstructor', props.contextid)
const dataAdapter = new dataAdapterConstructor({boType:{name: 'ViewConfiguration'}, contextId: props.contextid})
const boService = BaseServiceProvider.ServiceWithContext<BOService>('BOService', props.contextid)

function GetComponents(){
    return dataAdapter.GetAll()
}

//todo fix control component actions
//todo fix action to element mappings in templates


function GetCustomComponentEvents(identifier: string){
    const component = GetComponents()?.find(v => v.publicidentifier == identifier)
    if(component == null){
       return []
    }  
    return ViewDefinition.GetDefinitionByTypeAndName(component.type, 'CustomEvents')?.map(v => v.name)

}

function addAction(){
    if(eventCopy.value.actions == undefined){
        eventCopy.value.actions = []
    }

    eventCopy.value.actions.push({
        identifier: 'action_' + boService.NewId({}).id,
    })
}

function UpdateOrSaveAction(action: IUIAction){
    const index = eventCopy.value.actions.findIndex(v => v.identifier == action.identifier)
    if(index == -1){
        eventCopy.value.actions.push(action)
    }else{
        eventCopy.value.actions[index] = action
    }
    emits('updateEvent', eventCopy.value)
}
function DeleteAction(action: IUIAction){
    const index = eventCopy.value.actions.findIndex(v => v.identifier == action.identifier)
    if(index != -1){
        eventCopy.value.actions.splice(index, 1)
    }

    emits('updateEvent', eventCopy.value)
}
</script>

<style lang="scss" scoped>
@import '../../assets/custom-buttons.css';

.edit-event-handler {
    background-color: theme('colors.brightgrey');
}

</style>
