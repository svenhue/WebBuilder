<template>
  <div
  class="development-options-drawer"
    :style="{
      width: '100%',
      border: '1px solid black',
      height: '100%',
      color: 'white!important'
    }"
  >

  <UTabs :is="tab" :items="items" class="w-full">
    <template #edit="{ item }">
          <ElementStyleConfigurationComponent
          @updateelement="(values) => emits('updateelement', values)"
          :contextid="contextid"
          ref="styleComponent"
          :current-element="currentElement">
          </ElementStyleConfigurationComponent>
    </template>
    <template #settings="{item}">
                <ElementOptionsComponent
          :style="{width: '100%', height: 'max-content'}"
          ref="optionsComponent"
          :view="currentElement"
          @updateElement="(values) =>emits('updateelement', values) ">
          </ElementOptionsComponent>
    </template>
    <template #actions="{item}">
           <ActionConfigurationComponent
          :current-element="currentElement"
          @update-element="(values) => emits('updateelement', values)"
          ref="actionComponent"
          > </ActionConfigurationComponent>
    </template>
  
  </UTabs>

  </div>
</template>

<script setup lang="ts">
import { ref, ComputedRef, watch, onMounted, computed } from 'vue';
import ElementStyleConfigurationComponent from './ElementStyleConfigurations/ElementStyleConfigurationComponent.vue';
import ActionConfigurationComponent from './UIActions/ActionConfigurationComponent.vue';
import { IViewConfiguration } from 'alphautils';
import ElementOptionsComponent from './ElementOptions/ElementOptionsComponent.vue';


 const props = defineProps({
  currentElement: {
    type:  Object as () => ComputedRef<IViewConfiguration>,
    required: true,
  },
  contextid: {
    type: Number,
    required: true,
  },
})
const styleComponent = ref(null);
const optionsComponent = ref(null);
const actionComponent = ref(null);
const emits = defineEmits(['updateelement', 'focusView'])

const tab = ref('edit');

const items = [
  {
    label: 'Edit',
    value: 'edit',
    slot: 'edit'
  },
  {
    label: 'Settings',
    value: 'settings',
    slot: 'settings'
  },
  {
    label: 'Actions',
    value: 'actions',
    slot: 'actions'
  }
]



watch(props.currentElement, (v) => {
  if(v?.id != undefined){
    styleComponent.value?.SetElement(v);
    optionsComponent.value?.SetElement(v);
    actionComponent.value?.SetElement(v);
  }
},
{
  deep: true
})

onMounted(() => {
  styleComponent.value?.SetElement(props.currentElement.value);
  optionsComponent.value?.SetElement(props.currentElement.value);
  actionComponent.value?.SetElement(props.currentElement.value);
})

</script>

<style lang="scss">
.development-options-drawer{
  background-color: var(--color-primary-dark);

  .tab-class{
    color: var(--color-primary);
  }
  .tab-panels{
    background-color: var(--color-primary-dark);

  }
}

</style>
