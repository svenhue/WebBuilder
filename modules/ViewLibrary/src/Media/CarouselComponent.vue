<template>
    <div     :style="view?.style"
        v-bind="view?.htmlattributes"
      >
        <q-carousel
        ref="templateRef"
      :model-value="viewElement.ResolveTemplateProperty(view?.content?.currentPanel)"
        @update:model-value="(val) => viewModel.PartialUpdate(view, {key: 'content.currentPanel', value: val})"
        :animated="view.behavior.animated ?? false"
        :infinite="view.behavior.infinite ?? true"
        :swipeable="view.behavior.swipeable ?? true"
        :vertical="view.behavior.vertical ?? false"
        :autoplay="view.behavior.autoplay ?? false"

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
            <q-carousel-slide v-for="child in children" :key="child.id" :name="child.publicidentifier">
                <BaseViewTreeRenderer 
                :view="child"
                :contextid="contextid">
                </BaseViewTreeRenderer>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { BaseViewModel, useViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { CarouselViewElement } from './CarouselComponent/CarouselViewElement';
import { QCarousel } from 'quasar';
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

const templateRef = ref<QCarousel>(null)
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