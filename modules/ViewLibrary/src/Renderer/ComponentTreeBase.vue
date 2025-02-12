<template>
        <BaseViewTreeRenderer
        v-if="!isPage"
        :contextid="contextid"
        :resolver="resolver"
        :view="service.GetRootView().value">
        </BaseViewTreeRenderer>
        <BaseViewTreeRenderer
        v-else
        :contextid="contextid"
        :resolver="resolver"
        :view="service?.GetRootView()?.value">
        </BaseViewTreeRenderer>
</template>

<script setup lang="ts">
import { UITreeProviderService } from './UITreeProviderService';
import BaseViewTreeRenderer from './BaseViewTreeRenderer.vue';
import { IPageConfiguration } from 'alphautils/view/IPageConfiguration.ts';
import { IViewConfiguration } from 'alphautils/view/IViewConfiguration.ts';
import { IComponentResolver } from './IComponentResolver';


const props = defineProps({
    contextid:{
        type:Number,
        required:true
    },
    view:{
        type: Object as () => IViewConfiguration | IPageConfiguration,
        required: true,
    },
    isPage:{
        type: Boolean,
        required: false,
        default: false
    },
    resolver:{
        type: Object as () => IComponentResolver,
        required: false
    
    }

})

const service = new UITreeProviderService(props.contextid, props.view)
service.subscribeToViewContextChanges(props.contextid)


</script>