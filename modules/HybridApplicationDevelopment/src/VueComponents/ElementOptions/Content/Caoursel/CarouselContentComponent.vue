<template>
    <div>
        <TextInputEditorComponent :label="'Initial slide'" 
        :contextid="currentElement.contextid" 
        :value="currentElement?.content?.currentPanel ?? ''" 
        @updateValue="(values) => $emit('updateElement', [{key: 'content.currentPanel', value: values}])">
        </TextInputEditorComponent>
       
    <q-checkbox
    label="Navigation"
        :model-value="currentElement.content?.navigation ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.navigation', value: values}])}"
    >
    </q-checkbox>
    <q-select dense 
    :options="navigationPositionOptions"
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.navigationPosition', value: values.value}])}"
    :model-value="currentElement.content?.navigationPosition ?? '' ">
        <template v-slot:before >
            <div class="editor-input-label">
            Navigation Position
        </div>
        </template>
    </q-select>
    <q-checkbox
    label="Show navigation arrows"
        :model-value="currentElement.content?.arrows ?? false"
        @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.arrows', value: values}])}"
    >
    </q-checkbox>
    <q-input dense :model-value="currentElement.content?.prevIcon ?? ''" 
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.prevIcon', value: values}])}">
        <template v-slot:before >
            <div class="editor-input-label">
            Previous Icon
        </div>
        </template>
    </q-input>
    <q-input dense :model-value="currentElement.content?.nextIcon ?? ''" 
    @update:model-value="(values) =>  { $emit('updateElement', [{key: 'content.nextIcon', value: values}])}">
        <template v-slot:before >
            <div class="editor-input-label">
            Next Icon
        </div>
        </template>
    </q-input>
</div>
</template>

<script setup lang="ts">
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