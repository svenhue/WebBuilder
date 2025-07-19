<template>
    <q-dialog v-model="show" >
        <q-card class="editor-formfield-form">
            <q-card-section>
                Form Field
            </q-card-section>
            <q-card-section>
                <q-form @submit="onSubmit">
                <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" v-model="formField.label" label="Label" required dense></InputComponent>
                <q-select v-model="formField.componenttype" label="Component type" :options="typeoptions" required dense></q-select>
                <q-select v-if="formField.inputType == 'Input'" v-model="formField.inputType" :options="inputTypes"></q-select>
                <q-checkbox v-model="formField.required" label="Required" type="boolean" dense></q-checkbox>
                <q-separator></q-separator>
                <ButtonComponent label="Submit" type="submit" color="primary"></ButtonComponent>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>


<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { IFormField } from 'alphaviewlibrary';
import { reactive, ref } from 'vue';

const emits = defineEmits(['updateField'])


defineExpose({
    setField,
    setShow
})
const show = ref(false)

function setShow(val) {
    show.value = val;
}

const formField = reactive<IFormField>({
    label: '',
    componenttype: '',
    required: false,
    inputType: ''
});

const inputTypes = [
    {
        label: 'Text',
        value: 'text'
    },
    {
        label: 'Number',
        value: 'number'
    },
    {
        label: 'Email',
        value: 'email'
    },
    {
        label: 'Password',
        value: 'password'
    },
    {
        label: 'Date',
        value: 'date'
    },
    {
        label: 'Time',
        value: 'time'
    },
    {
        label: 'Tel',
        value: 'tel'
    },
    {
        label: 'Url',
        value: 'url'
    }

];

const typeoptions = [
    {
        label: 'Input',
        value: 'viewdefinition:Form:InputComponent',
        tag: 'component:InputComponent'
    },
    {
        label: 'Checkbox',
        value: 'viewdefinition:Form:CheckboxComponent',
        tag: 'component:CheckBoxComponent'
    },
    {
        label: 'Rating',
        value: 'viewdefinition:Form:RatingComponent',
        tag: 'component:RatingComponent'
    },
    {
        label: 'Select',
        value: 'viewdefinition:Form:SelectComponent',
        tag: 'component:SelectComponent'
    },
    {
        label: 'Textarea',
        value: 'viewdefinition:Form:TextareaComponent',
        tag: 'component:TextareaComponent'
    }
]

function setField(newField) {
    Object.entries(newField).forEach(([key, value]) => {
        formField[key] = value;
    });

}

function onSubmit() {
    emits('updateField', formField);
    setShow(false);
}

</script>

<style lang = "scss" scoped>

.editor-formfield-form{
    width: 500px;
        height: 500px;
        background-color: white;
        padding: 20px;
       // border: 2px solid $primary;
}

</style>