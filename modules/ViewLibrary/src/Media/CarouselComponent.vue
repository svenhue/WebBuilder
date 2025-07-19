<template>
    <div     :style="viewElement.ResolverObjectProperty(view.style)"
        v-bind="view?.htmlattributes"
      >
        <UCarousel
        ref="templateRef"
      :model-value="viewElement.ResolveTemplateProperty(view?.content?.currentPanel)"
        @update:model-value="(val) => viewModel.PartialUpdate(view, {key: 'content.currentPanel', value: val})"
        :animated="view.behavior.animated ?? false"
        :infinite="view.behavior.infinite ?? true"
        :swipeable="view.behavior.swipeable ?? true"
        :vertical="view.behavior.vertical ?? false"
        :autoplay="view.behavior.autoplay ?? false"
    :items="children"
        :control-color="view.appearence?.controlColor ?? 'white'"
        :navigation-icon="view.content?.navigationIcon ?? 'fibert_manual_record'"
        :navigation-active-icon="view.content?.navigationActiveIcon ?? 'adjust'"
        :arrows="view.content.arrows ?? true"
        :prev-icon="view.content.prevIcon ?? ''"
        :next-icon="view.content.nextIcon ?? ''"
        :navigation="view.content.navigation ?? true"
        :navigation-position="view.content.navigationPosition ?? 'bottom'"
        :thumbnails="view.content.thumbnails"
        >
        <template #default="{ item }">
                <BaseViewTreeRenderer 
                :view="item"
                :contextid="contextid">
                </BaseViewTreeRenderer>
            </template>
        </UCarousel>
    </div>
</template>

<script setup lang="ts">
import { BaseViewModel, useViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { CarouselViewElement } from './CarouselComponent/CarouselViewElement';

const props = defineProps({
    viewId:{
        type: Number,
        required: true
    },
    contextid:{
        type: Number,
        required: true
    }
})

const templateRef = ref(null)
const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewModel = new BaseViewModel(props.contextid);
const viewElement = new CarouselViewElement(view, templateRef);


onMounted(() => {
    viewElement.bind();
})

onUnmounted (() => {
    viewElement.unbind();
})

</script>