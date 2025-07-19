<template>
    <div>
        <div>
        Fields
            <SelectComponent dense 
            :options="formSourceOptions" 
            :model-value="currentElement.dataConfig.fieldSource" 
            @update:model-value="(val) => $emit('updateElement', [{key:'dataConfig.fieldSource', value:val}])">

                <template v-slot:before>
                    <div class="editor-input-label" > Field source</div>

                </template>
            </SelectComponent>
        </div>
        <div>
            <ButtonComponent dense icon='add' @click='addField()'></ButtonComponent>
        </div>
        
        <div dense >
            <div dense
            v-for="field in childrenFields" :key="field">
                <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense 
                disable
                :model-value="field?.content.label" 
                @update:model-value="(val) => updateFieldProp(field, 'label',val)">
                </InputComponent>
                
                <div side> 
                    <ButtonComponent dense icon='edit' @click='editField(field)'></ButtonComponent>
                </div>
                <div side>
                    <ButtonComponent dense icon='delete' @click='deletefield(field)'></ButtonComponent>
                </div>
            </div>
        
        </div>
        <FormFieldDesignerComponent 
        ref="formFieldDesigner"
        @updateField="(val) => updateField(val)"
        
        >

        </FormFieldDesignerComponent>
    </div>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { IFormViewConfiguration,IFormField } from 'alphaviewlibrary';
import { computed, inject, ref, toValue, watch } from 'vue';
import FormFieldDesignerComponent from './FormFieldDesignerComponent.vue';
import { IViewConfiguration, SimpleNameValueCollection, useViewConfiguration } from 'alphautils';
import { RunTimeVueApplicationViewModel } from 'src/ViewModels/RuntimeVueApplicationViewModel';

const props = defineProps({
    currentElement: {
        type: Object as () => IFormViewConfiguration,
        required: true
    }
})

const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel;
const { view, children } = useViewConfiguration(props.currentElement.contextid, props.currentElement.id)

const childrenFields = computed(() => {
    
    const formFieldTags = ['viewdefinition:Form:InputComponent', 'viewdefinition:Form:SelectComponent', 'viewdefinition:Form:CheckboxComponent', 'viewdefinition:Form:RadioComponent', 'viewdefinition:Form:TextAreaComponent']
    return toValue(children)?.filter(c => formFieldTags.includes(c.type))
})

const emits = defineEmits(['updateElement'])

const formFieldDesigner = ref<typeof FormFieldDesignerComponent>(null)

const showEditor = ref(false)

const fieldInEditor = ref<IFormField>({})

const formSourceOptions = [
    {
        label: 'Manual',
        value: 'manual'
    },
    {
        label: 'Auto',
        value: 'auto'
    }
]

function editField(field: IViewConfiguration) {
    const viewcopy = JSON.parse(JSON.stringify(field))

    fieldInEditor.value = {
        id: viewcopy.id,
        content:{
            label: viewcopy.content.label
        },
        type: viewcopy.type,
        required: viewcopy.properties.required,
        inputType: viewcopy.content.dataType
    }
    formFieldDesigner.value?.setField({
        id: fieldInEditor?.value.id,
        label: fieldInEditor?.value.content?.label,
        componenttype: fieldInEditor?.value.type,
        required: fieldInEditor?.value.required,
        inputType: fieldInEditor?.value.inputType
    })
    showEditor.value = true
    formFieldDesigner.value.setShow(true)
    
}

function deletefield(field: IViewConfiguration) {
    viewModel.DeleteElement(field.id)
}

function updateField(field: IViewConfiguration){
    const existsView = viewModel.GetViews().find(v => v.id == field.id)
    if(existsView != undefined){
        const keyValuePairs = []
        const oldValues = {
            label: existsView.content.label,
            componenttype: existsView.type,
            required: existsView.properties.required,
            inputType: existsView.content.dataType,
            rules: existsView.properties.rules
        }

        Object.entries(field).forEach(([key, value]) => {
            if(oldValues[key] == value){
                return;
            }
            console.log(key, value)
            if(key == 'componenttype'){
                keyValuePairs.push({key: 'type', value: value.value})
                keyValuePairs.push({key: 'tag', value: value.tag})
            }else if(key == 'required'){
                keyValuePairs.push({key: 'properties.required', value: value})
            }else if(key == 'inputType'){
                keyValuePairs.push({key: 'content.dataType', value: value})
            } else if(key == 'label'){
                keyValuePairs.push({key: 'content.label', value: value})
            }
        })
        viewModel.PartialUpdateView(field.id, new SimpleNameValueCollection(keyValuePairs))
    }else{
        const values = {
            content:{
                label: fieldInEditor.value?.label ?? '',
                dataType: fieldInEditor.value?.inputType ?? undefined
            },
            properties:{
                rules: fieldInEditor.value?.required ? [{expression: "component.modelValue != undefined", message: "This field is required"}] : []
            },

        }
        viewModel.createElement(field.componentType, values)
    }
}

function addField(){

    showEditor.value = true
    formFieldDesigner.value.setShow(true)

}

function updateFieldProp(child, key: string, val: string){
    viewModel.PartialUpdateView(child.id, new SimpleNameValueCollection([{key: key, value: val}]))
    
}
</script>
