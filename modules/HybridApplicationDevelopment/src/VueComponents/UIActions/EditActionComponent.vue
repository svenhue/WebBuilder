<template>
  <div>
      <q-item dense>
        <q-item-section>
          {{ actionCopy.identifier }}
        </q-item-section>
        <q-item-section side :style="{display: 'flex'}">
          <div>
            <q-btn dense :icon="showEdit == true ? 'check' : 'edit'" @click="showEdit == true ? updateAndClose() : showEdit = true"></q-btn>
            <q-btn dense icon="delete" @click="$emit('deleteAction', actionCopy)"></q-btn>
          </div>
        </q-item-section>
    </q-item>
  <div class="create-action-component" v-if="showEdit">
    
            <q-select
            dense
            :options="GetSupportedActionTypes()"
            :model-value="actionCopy.type"
            @update:model-value="(value) => {actionCopy.type = value} "
            >
            <template v-slot:before>
                    <div class="editor-input-label"> Action Type </div>
                </template>
            </q-select>  
      
        <q-separator></q-separator>
        <div v-if="actionCopy?.type == UIActionTypes['Control component']">
            <q-select 
            :model-value="actionCopy.targetElement"
            @update:model-value="(value) => {actionCopy.targetElement = value.value}"
            :options="GetComponents()?.map(v => {return {label: v.name, value: v.publicidentifier}})"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Component </div>
                </template>
            </q-select>
            <q-select 
            :model-value="actionCopy.methodName"
            @update:model-value="(value) => {actionCopy.methodName = value.value}"
            :options="GetComponentMethods()"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Method </div>
                </template>
            </q-select>
        </div>
        <div v-else-if="actionCopy?.type == UIActionTypes['Trigger Event']">
            <q-select 
            :model-value="actionCopy.targetElement"
            @update:model-value="(value) => {actionCopy.targetElement = value.value}"
            :options="GetComponents()?.map(v => {return {label: v.name, value: v.publicidentifier}})"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Event </div>
                </template>
            </q-select>

            <q-select 
            :model-value="actionCopy.event"
            @update:model-value="(value) => {actionCopy.customEvent = value}"
            :options="GetCustomComponentEvents(actionCopy.targetElement)"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Component </div>
                </template>
            </q-select>
            
        </div>
        <div v-else-if="actionCopy.type == UIActionTypes['Call service']">
            <q-select
            dense
            :model-value="actionCopy.config?.service"
            :options="GetAvaibleServices()"
            @update:model-value="(value) => {actionCopy.config.service = value}"
            >

            </q-select>
        </div>
        <div>
       
        </div>

        <Teleport to="#jfiopqehf73408956234" v-if="actionCopy?.methodName != undefined">
            <EditCustomMethodComponent
            :action="actionCopy">

            </EditCustomMethodComponent>
        </Teleport>
  </div>
</div>
</template>

<script setup lang="ts">
import { IDataAdapter, IUIEvent, IViewConfiguration, UIActionTypes,UIEventTypes, UIEvents, RestrictedServiceProvider  } from 'alphautils';
import { BaseServiceProvider } from 'alphautils';
import { ViewDefinition } from '../../utils/Models/ViewDefinition';
import { ref } from 'vue';
import { interfaces } from 'inversify';
import EditCustomMethodComponent from './EditCustomMethodComponent.vue';


const props = defineProps({
    action: {
        type: Object as () => IUIEvent,
        required: true
    },
    contextid:{
        type: Number,
        required: true
    }
})

const emits = defineEmits(['updateAction', 'deleteAction'])

const showEdit = ref(false)

const actionCopy = ref<IUIEvent>(JSON.parse(JSON.stringify(props.action)))
  const dataAdapterConstructor = BaseServiceProvider.ServiceWithContext<interfaces.Newable<IDataAdapter>>('DataAdapterConstructor', props.contextid)
const dataAdapter = new dataAdapterConstructor({boType:{name: 'ViewConfiguration'}, contextId: props.contextid})

function GetAvaibleServices(){
    return RestrictedServiceProvider.allowedServices
}

function GetSupportedActionTypes(){
    return Object.entries(UIActionTypes).map(v => v[0]) 
    const supportedActionTypes = ViewDefinition.GetDefinitionByTypeAndName(props.element.type, 'actionTypes')
    const actionsTypes = []
    for(const key in UIActionTypes){
        if(supportedActionTypes?.includes(key)){
            actionsTypes.push(key)
        }
    }
    return actionsTypes
}
function GetComponentMethods(){
    const component = GetComponents()?.find(v => v.publicidentifier == actionCopy.value?.targetElement)
    if(component == null){
       return []
    }  
    return ViewDefinition.GetDefinitionByTypeAndName(component.type, 'ComponentMethods')?.map(v => {return { label: v.name, value: v.name} })
}

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

function updateAndClose(){
    emits('updateAction', actionCopy.value)
    showEdit.value = false
}
</script>
