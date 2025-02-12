<template>
    <q-card>
        <q-card-section>
            Edit Event Handler
            <q-btn dense icon="cancel" @click="$emit('close')" :style="{
                position: 'absolute',
                right: '10px',
                top: '10px'
            }">

            </q-btn>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
            Event
            <q-select
            :options="Object.values(UIEventTypes)"
            
            @update:model-value="(value) => { eventCopy.type = value, $emit('updateEvent',eventCopy)} "
            :model-value="eventCopy.type"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Event Type </div>
                </template>
            </q-select>
            <q-select
            dense
            :model-value="eventCopy?.identifier"
                :options="eventCopy.type == UIEventTypes['domEvent'] ? Object.values(UIEvents) : GetCustomComponentEvents(element.publicidentifier)"
                @update:model-value="(value) => {eventCopy.identifier = value, $emit('updateEvent',eventCopy)}"
            >
                <template v-slot:before>
                    <div class="editor-input-label"> Trigger </div>
                </template>
            </q-select>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
            Actions
            <q-btn dense icon="add" @click="addAction()" :style="{
                position: 'absolute',
                right: '10px',
                top: '10px',
                marginBottom: '10px'
            }">

            </q-btn>
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
        </q-card-section>

        <div >
            <q-separator>

            </q-separator>
            <q-card-section >
                <div id="jfiopqehf73408956234">
                    </div>
            </q-card-section>
        </div>
    </q-card>
</template>


<script setup lang="ts">
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