<template>
    <div>
   
        <span   v-if="view.properties?.showLabelBefore == true"textnode>
                {{ t(viewElement.ResolveTemplateProperty(view.content.label)) }}
        </span>
    <UInput
    ref="test"
    dense
    :style="viewElement.ResolverObjectProperty(view.style)"
    :required="view.properties?.required ?? false"
    :type="view.content?.dataType ?? 'text'"
    :label="view.properties?.showLabelInInput == true ? t(viewElement.ResolveTemplateProperty(view?.content.label)) : undefined" 
    :model-value="view?.modelValue" 
    v-bind="view?.htmlattributes"
    :rules="viewElement?.ValidateRules()"
    @update:model-value="(value) => { viewModel.PartialUpdate(view, {key:'modelValue', value:value}), formViewModel != undefined ? formViewModel.SetValue(`${view.content.label?.replace(/\s/g, '').toLowerCase()}`, value) : null}"
    >


    </UInput>
    </div>

</template>

<script setup lang="ts">
import {  inject, onMounted, onUnmounted} from 'vue';
import { InputView } from './Input/InputView';
import { BaseViewModel, ValueValidationViewElement, useViewConfiguration } from 'alphautils';
import { FormViewModel } from './Form/FormViewModel';
import { useI18n } from 'vue-i18n'
const props = defineProps({
    viewId: {
        type: Number,
        required: false,
    },
    contextid: {
        type: Number,
        required: false,
    }
})
const { t } = useI18n();
const { view } = useViewConfiguration(props.contextid, props.viewId) as { view: InputView }
const viewElement = new ValueValidationViewElement(view);
const viewModel = new BaseViewModel(viewElement.GetConfiguration().contextid);

const formViewModel = inject('form', undefined) as FormViewModel;
onMounted(() => {
    viewElement.bind();

})

onUnmounted(() => {
    viewElement.unbind();
    viewModel.Dispose();
})

</script>