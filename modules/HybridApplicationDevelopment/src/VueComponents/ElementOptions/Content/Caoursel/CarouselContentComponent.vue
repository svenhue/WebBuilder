<template>
    <div>
        <TextInputEditorComponent :label="'Initial slide'" 
        :contextid="currentElement.contextid" 
        :value="currentElement?.content?.currentPanel ?? ''" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.currentPanel', value: values}])">
        </TextInputEditorComponent>
       
    <UCheckbox
    label="Navigation"
        :model-value="currentElement.content?.navigation ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.navigation', value: values}])}"
    >
    </UCheckbox>
    <SelectComponent dense 
    :options="navigationPositionOptions"
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.navigationPosition', value: values.value}])}"
    :model-value="currentElement.content?.navigationPosition ?? '' ">
        <template v-slot:before >
            <div class="editor-input-label">
            Navigation Position
        </div>
        </template>
    </SelectComponent>
    <UCheckbox
    label="Show navigation arrows"
        :model-value="currentElement.content?.arrows ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.arrows', value: values}])}"
    >
    </UCheckbox>
    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="currentElement.content?.prevIcon ?? ''" 
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.prevIcon', value: values}])}">
        <template v-slot:before >
            <div class="editor-input-label">
            Previous Icon
        </div>
        </template>
    </InputComponent>
    <InputComponent class="alpha-input-base spec-input"
                    :input-class="'alpha-input'" dense :model-value="currentElement.content?.nextIcon ?? ''" 
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.nextIcon', value: values}])}">
        <template v-slot:before >
            <div class="editor-input-label">
            Next Icon
        </div>
        </template>
    </InputComponent>
</div>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'

import { TextInputEditorComponent } from 'alphaviewlibrary';
import { IViewConfiguration } from 'alphautils';

defineProps({
    currentElement: {
        type: Object as () => IViewConfiguration,
        required: true
    }
})

const navigationPositionOptions = [
    {
        label: 'Top',
        value: 'top'
    },
    {
        label: 'Bottom',
        value: 'bottom'
    },
    {
        label: 'Left',
        value: 'left'
    },
    {
        label: 'Right',
        value: 'right'
    }

]

defineEmits(['updateElement'])

</script>