<template>
  <div class="action-configuration-component" v-if="currentElement.value != undefined">
    <div>
        
        <q-btn
        dense
        icon="add"
        label="create Event"
        @click="createEvent"
        :style="{ width: '100%' }"
      >    
        </q-btn>    
    <q-list
    bordered
    dense>
        <q-item 
        v-for="event in currentElement.value?.interaction?.events" :key="event.id" 
        @click="focssedEvent = event, showEdit = true"
        clickable
        dense>
            <q-item-section>
                <q-item-label>{{ event?.identifier }}</q-item-label>
            </q-item-section>
            <q-item-section>
                <q-item-label> {{  event?.actions?.map(a => { return a.identifier} ) }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>

    <EditEventHandlerComponent 
    :key="key" 
    v-if="showEdit && focssedEvent != undefined" 
    :event="focssedEvent" 
    :element="currentElement.value" 
    :contextid="currentElement.value.contextid"
    @close="showEdit = false"
    @update-event="(values) => updateEvent(values)">

    </EditEventHandlerComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BOService, IViewConfiguration } from 'alphautils';
import { IUIEvent } from 'alphautils';
import EditEventHandlerComponent from './EditEventHandlerComponent.vue';
import { ref } from 'vue';
import { UIEventTypes } from 'alphautils';
import { IUIAction } from 'alphautils';
import { BaseServiceProvider } from 'alphautils';

const props = defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const showEdit = ref(false)
const focssedEvent = ref<IUIEvent>(null)
const key = ref(0)

const boService = BaseServiceProvider.Service<BOService>('BOService')

function createEvent(){
    key.value = key.value + 1
    focssedEvent.value = defaultEventSceleton
    showEdit.value = true
    boService.NewId(focssedEvent.value)
    emit('updateElement', [{key: 'interaction.events', value: [...props.currentElement?.interaction?.events ?? [], defaultEventSceleton]}])
    reMountTargetView()
}

function updateEvent(event: IUIEvent){
  key.value = key.value + 1
  const events = props.currentElement?.interaction?.events?.filter(e => e.id != event.id) ?? []
  emit('updateElement', [{key: 'interaction.events', value: [...events, event]}])
  reMountTargetView()
}

//remount the view so that the new events are binded and old events are removed
function reMountTargetView(){
  const key = props.currentElement.value.key ?? 0;  
  console.log(key)
  emit('updateElement', [{key: 'key', value: key+ 1}])
    
}

const defaultEventSceleton: IUIEvent = {
    type: UIEventTypes.domEvent,
    action: {
        
    } as IUIAction,
    targetElement: props.currentElement?.value?.publicidentifier,
    targetElementId: props.currentElement?.value?.id,
    identifier: undefined
}

const emit = defineEmits(['updateElement'])


function SetElement(view: IViewConfiguration) {  
  if(focssedEvent.value != undefined){
    key.value = key.value + 1
    focssedEvent.value = view.interaction?.events?.find(e => e.id == focssedEvent.value.id)
    
  }
}

defineExpose({
  SetElement
})


</script>
