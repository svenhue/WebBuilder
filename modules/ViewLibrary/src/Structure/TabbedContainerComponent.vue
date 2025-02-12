<template>
    <div v-bind="view?.htmlattributes" :style="view?.style" ref="viewRef">
        <div  v-if="view?.isRoutable == false || view?.isRoutable == undefined">
        <q-tabs
       :vertical="view?.appearance?.isVertical ?? false"
       :align="view?.appearance?.alignment ?? 'left'"
        :content-class="view?.appearance?.contentClass ?? ''"
        :active-class="view?.appearance?.activeClass ?? ''"
        :outside-arrows="view?.appearance?.outsideArrows ?? false"
        :mobile-arrows="view?.appearance?.mobileArrows ?? false"
        :breakpoint="view?.appearance?.breakpoint ?? ''"
        v-model="viewmodel.activeTab.value"
        >
            <q-tab v-for="tab in children" :key="tab.id"
            :name="tab.properties.label"
            :label="tab.properties.label"
           
            >
            </q-tab>
        </q-tabs>
            <q-separator></q-separator>
            <q-tab-panels
            :animated="true"
            transition-duration="100ms"
            :keep-alive="true"
            v-model="viewmodel.activeTab.value"
            >
                <q-tab-panel v-for="tab in children" :key="tab"
                :name="tab.properties.label">
                    <BaseViewTreeRenderer :view="tab" :contextid="contextid">
                    </BaseViewTreeRenderer>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <div v-else>
            <q-tabs
            :content-class="view?.appearance?.contentClass ?? ''"
            :active-class="view?.appearance?.activeClass ?? ''"
            :vertical="view?.appearance?.isVertical ?? false"
            :outside-arrows="view?.appearance?.outsideArrows ?? false"
            :mobile-arrows="view?.appearance?.mobileArrows ?? false"
            :breakpoint="view?.appearance?.breakpoint ?? ''"
            v-model="viewmodel.activeTab.value"
            >
            </q-tabs>
                <q-route-tab v-for="tab in children" :key="tab.name"

                :name="tab.name"
                :label="tab.properties.label"
                :to="tab.properties.route"
                />

            
            <div v-if="view?.isRoutable == true">
                <router-view v-slot="{ Component }" class="test">
                    <keep-alive>
                    <component :is="Component"/>
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TabbedContainerViewModel } from './TabbedContainer/TabbedContainerViewModel';
import { onMounted, onUnmounted, ref } from 'vue';
import { ViewElement, useViewConfiguration } from 'alphautils';
import BaseViewTreeRenderer from '../Renderer/BaseViewTreeRenderer.vue';
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
const viewRef = ref<InstanceType<typeof HTMLDivElement>>(null);

const { view, children } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view)

const viewmodel = new TabbedContainerViewModel(viewElement.GetConfiguration())

onMounted(() => {
    viewElement.bind(props.contextid);
})

onUnmounted(() => {
    viewElement.unbind();
})

</script>