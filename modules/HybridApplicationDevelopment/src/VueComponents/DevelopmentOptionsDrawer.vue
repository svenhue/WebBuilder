<template>
  <q-splitter
    :style="{
      width: '100%',
      border: '1px solid black',
      height: '100%'
    }"
    v-model="splitterModel"
    horizontal
  >
    <template v-slot:before>
      <q-tabs v-model="tab" class="text-teal">
        <q-tab name="edit" icon="brush"></q-tab>
        <q-tab name="settings" icon="settings"></q-tab>
        <q-tab name="actions" icon="bolt"></q-tab>
      </q-tabs>
      <div>
        Edit the {{  currentElement?.value?.publicidentifier }} element
      </div>
    </template>

    <template v-slot:after>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="edit">
          <ElementStyleConfigurationComponent
          @updateelement="(values) => emits('updateelement', values)"
          :contextid="contextid"
          ref="styleComponent"
          :current-element="currentElement">
          </ElementStyleConfigurationComponent>
        </q-tab-panel>

        <q-tab-panel name="settings"> 

          <ElementOptionsComponent
          :style="{width: '100%', height: 'max-content'}"
          ref="optionsComponent"
          :view="currentElement"
          @updateElement="(values) =>emits('updateelement', values) ">
          </ElementOptionsComponent>
        </q-tab-panel>
        <q-tab-panel name="actions">
          <ActionConfigurationComponent
          :current-element="currentElement"
          @update-element="(values) => emits('updateelement', values)"
          ref="actionComponent"
          > </ActionConfigurationComponent>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { ref, ComputedRef, watch, onMounted } from 'vue';
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
const splitterModel = ref(20);

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
