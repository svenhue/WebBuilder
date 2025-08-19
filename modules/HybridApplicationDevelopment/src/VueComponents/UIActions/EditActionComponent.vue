<template>
  <div class="edit-action-component">
      <div dense>
        <div>
          {{ actionCopy.identifier }}
        </div>
        <div side :style="{display: 'flex'}">
          <div>
            <ButtonComponent dense :icon="showEdit == true ? 'check' : 'edit'" @click="showEdit == true ? updateAndClose() : showEdit = true"></ButtonComponent>
            <ButtonComponent dense icon="mdi:delete" @click="$emit('deleteAction', actionCopy)"></ButtonComponent>
          </div>
        </div>
    </div>
  <div class="create-action-component" v-if="showEdit">
    
            <SelectComponent
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            dense
            :options="GetSupportedActionTypes()"
            :model-value="actionCopy.type"
            @update:model-value="(value) => {actionCopy.type = value} "
            >
            <template v-slot:before>
                    <div class="editor-input-label"> Action Type </div>
                </template>
            </SelectComponent>  
      
        <div v-if="actionCopy?.type == UIActionTypes['Control component']">
            <SelectComponent 
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            :model-value="actionCopy.targetElement"
            @update:model-value="(value) => {actionCopy.targetElement = value.value}"
            :options="GetComponents()?.map(v => {return {label: v.name, value: v.publicidentifier}})"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Component </div>
                </template>
            </SelectComponent>
            <SelectComponent 
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            :model-value="actionCopy.methodName"
            @update:model-value="(value) => {actionCopy.methodName = value.value}"
            :options="GetComponentMethods()"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Method </div>
                </template>
            </SelectComponent>
        </div>
        <div v-else-if="actionCopy?.type == UIActionTypes['Trigger Event']">
            <SelectComponent 
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            :model-value="actionCopy.targetElement"
            @update:model-value="(value) => {actionCopy.targetElement = value.value}"
            :options="GetComponents()?.map(v => {return {label: v.name, value: v.publicidentifier}})"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Event </div>
                </template>
            </SelectComponent>

            <SelectComponent 
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            :model-value="actionCopy.event"
            @update:model-value="(value) => {actionCopy.customEvent = value}"
            :options="GetCustomComponentEvents(actionCopy.targetElement)"
            dense>
                <template v-slot:before>
                    <div class="editor-input-label"> Component </div>
                </template>
            </SelectComponent>
            
        </div>
        <div v-else-if="actionCopy.type == UIActionTypes['Call service']">
            <SelectComponent
            class="alpha-select"
            popup-content-class="alpha-dropdown-content"
            dense
            :model-value="actionCopy.config?.service"
            :options="GetAvaibleServices()"
            @update:model-value="(value) => {actionCopy.config.service = value}"
            >

            </SelectComponent>
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

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

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

<style lang="scss" scoped>

.edit-action-component{
    background-color: var(--color-brightgrey);
}
</style>