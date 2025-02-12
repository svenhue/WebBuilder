<template>
    <q-select 
    :rules="viewElement.ValidateRules()"
    dense
   
    :label="t(viewElement.ResolveTemplateProperty(view.content.label))" 
    :model-value="view.modelValue ?? ''"
    @update:model-value="(val) => viewModel.PartialUpdate(view, {key:'modelValue', value:val})"
    :options="view.content?.options ?? []"
    v-bind="view.htmlattributes">

        <template v-if="view.properties.showLabelBefore == true" v-slot:before >
            <span  textnode>
                {{  t(viewElement.ResolveTemplateProperty(view.content.label)) }}
            </span>
        </template>
    </q-select>
</template>


<script setup lang="ts">


import { BaseViewModel, ValueValidationViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
const props = defineProps({
    viewId: {
        type: Number,
        required: true,
    },
    contextid: {
        type: Number,
        required: true,
    }
})
const { t } = useI18n()
const { view } = useViewConfiguration(props.contextid, props.viewId)

const viewElement = new ValueValidationViewElement(view)

const viewModel = new BaseViewModel(props.contextid)

onMounted(() => {
    viewElement.bind()
})

onUnmounted(() => {
    viewElement.unbind()
})
</script>