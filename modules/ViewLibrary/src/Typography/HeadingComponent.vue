<template>
        <h1
        v-if="view?.properties.headingTag == 'h1'" 
        textnode
        v-html="t(view?.content?.text)"
        v-bind="view?.htmlattributes" :style="view?.style" >
           
        </h1>
        <h2
        v-else-if="view?.properties.headingTag == 'h2'" textnode
        v-html="t(view?.content?.text)"        v-bind="view?.htmlattributes" :style="view?.style" >
           
        </h2>
        <h3
        v-else-if="view?.properties.headingTag == 'h3'" textnode     v-html="t(view?.content?.text)"
        v-bind="view?.htmlattributes" :style="view?.style" >
          
        </h3>
        <h4
        v-else-if="view?.properties.headingTag == 'h4'" textnode     v-html="t(view?.content?.text)"
        v-bind="view?.htmlattributes" :style="view?.style" >
           
        </h4>
        <h5
        v-else-if="view?.properties.headingTag == 'h5'" textnode
        v-html="t(view?.content?.text)"        v-bind="view?.htmlattributes" :style="view?.style" >
         
        </h5>
        <h6
        v-else textnode
         v-html="t(view?.content?.text)"
        v-bind="view?.htmlattributes" :style="view?.style" >
    
        </h6>
</template>

<script setup lang="ts">
import { ViewElement, useViewConfiguration } from 'alphautils';
import { onMounted, onUnmounted} from 'vue';
import { useI18n } from "vue-i18n"

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


const { t } = useI18n();
const { view } = useViewConfiguration(props.contextid, props.viewId);

const viewElement = new ViewElement(view);

onMounted(() => {
    viewElement.bind(props.contextid);
})

onUnmounted(() => {
    viewElement.unbind();
})
</script>