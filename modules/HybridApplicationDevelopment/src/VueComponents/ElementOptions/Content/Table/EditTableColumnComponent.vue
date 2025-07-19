<template>
    <div >
        <q-dialog v-model="t" :auto-close="false" >
            <CardComponent class="editor-column-form">
                <div>
                    
                        Edit Column
                    
                </div>
                <div>
                    <q-form  @submit="onSubmit">
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.name" label="Name" required dense></InputComponent>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.label" label="Label" required dense></InputComponent>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.field" label="Field" required dense></InputComponent>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.position" label="Position" required dense></InputComponent>
                    <q-checkbox v-model="column.required" label="Required" type="checkbox" dense></q-checkbox>
                    <q-select :multiple="false" :optinos="alignOptions" v-model="column.align" label="Align" dense></q-select>
                    <q-checkbox v-model="column.sortable" label="Sortable" type="checkbox" dense></q-checkbox>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.style" label="Style" dense></InputComponent>
                    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="column.classes" label="Classes" dense></InputComponent>
                    <q-separator></q-separator>
                    <ButtonComponent label="Save" type="submit" color="primary"></ButtonComponent>
                    </q-form>
                </div>
        </CardComponent>
        </q-dialog>
</div>
  </template>
  
  <script setup lang="ts">import { CardComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

  import { ref } from 'vue';
  
const emits = defineEmits(['updateColumn'])
defineExpose({
    setColumn,
    showEditor

})
  
const t = ref(false)

  const column = ref({
    name: '',
    label: '',
    field: '',
    required: false,
    align: '',
    sortable: false,
    style: '',
    classes: '',
    position: 0
  });
  const alignOptions = [
    {label: 'Left', value: 'left'},
    {label: 'Center', value: 'center'},
    {label: 'Right', value: 'right'}
  ]
  function setColumn(newColumn) {
    column.value = newColumn;
  }
  function showEditor(){
    t.value = true;
  }
  
  function onSubmit(evt){
    evt.preventDefault();
    console.log(column.value);
    emits('updateColumn', column.value);
    t.value = false;
  };
  </script>

    <style lang="scss">

    .editor-column-form{
        padding: 20px;
    //    border: 2px solid $primary;
        background-color: white;
        width: 500px;
        height: 500px;
    }
    </style>