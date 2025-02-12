<template>
    <div >
        <q-dialog v-model="t" :auto-close="false" >
            <q-card class="editor-column-form">
                <q-card-section>
                    
                        Edit Column
                    
                </q-card-section>
                <q-card-section>
                    <q-form  @submit="onSubmit">
                    <q-input v-model="column.name" label="Name" required dense></q-input>
                    <q-input v-model="column.label" label="Label" required dense></q-input>
                    <q-input v-model="column.field" label="Field" required dense></q-input>
                    <q-input v-model="column.position" label="Position" required dense></q-input>
                    <q-checkbox v-model="column.required" label="Required" type="checkbox" dense></q-checkbox>
                    <q-select :multiple="false" :optinos="alignOptions" v-model="column.align" label="Align" dense></q-select>
                    <q-checkbox v-model="column.sortable" label="Sortable" type="checkbox" dense></q-checkbox>
                    <q-input v-model="column.style" label="Style" dense></q-input>
                    <q-input v-model="column.classes" label="Classes" dense></q-input>
                    <q-separator></q-separator>
                    <q-btn label="Save" type="submit" color="primary"></q-btn>
                    </q-form>
                </q-card-section>
        </q-card>
        </q-dialog>
</div>
  </template>
  
  <script setup lang="ts">
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