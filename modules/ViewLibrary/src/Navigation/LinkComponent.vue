<template>
    <a 
    :href="view?.content?.url" 
    :style="view.style" 
    textnode 
    :class="getLinkClass(view.class)" 
    :id="view.publicIdentifier">
        {{  view?.content?.text }}
    </a>
</template>

<script setup lang='ts'>
import { ViewElement, useViewConfiguration } from 'alphautils';
import { ref, onMounted, onUnmounted, MaybeRefOrGetter } from 'vue';
import { QBtn } from 'quasar';
import { IViewConfiguration } from 'alphautils';
import { inject } from 'vue';
const props = defineProps({
    viewId: {
        type: Number,
        required: false,
    },
    contextid: {
        type: Number,
        required: false,
    },
    view: {
        type: Object as () => IViewConfiguration,
        required: false
    }
})

const viewRef = ref<InstanceType<typeof QBtn>>(null);
const {view } = useViewConfiguration(props.contextid, props.viewId, props.view) as MaybeRefOrGetter<[ MaybeRefOrGetter<IViewConfiguration>, MaybeRefOrGetter<Array<IViewConfiguration>>]>
const viewelement = new ViewElement<typeof QBtn>(view);

const devMode = inject('devMode');

function getLinkClass(){
    
    if(devMode?.value == undefined){
        return view.class;
    }
    if(devMode?.value == 'disableHinderingEvents'){
        if(Array.isArray(view.class)){
            return [...view.class, 'disable-hindering-events'];
        }else{
            return [view.class, 'disable-hindering-events'];
        }
    }
    return view?.class;
}

onMounted(() => {
    viewelement.bind(props.contextid, viewRef);
})

onUnmounted(() => {
    viewelement.unbind();
})

</script>
