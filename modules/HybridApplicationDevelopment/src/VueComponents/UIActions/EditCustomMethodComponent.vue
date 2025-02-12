<template>
    <div>
        <component :is="component">

        </component>
    </div>
</template>


<script setup lang="ts">
import { IActionConfiguration } from 'alphautils';
import { computed, watch } from 'vue';
import SubmitMethodConfigurationComponent from '../ElementOptions/Interaction/ComponentMethods/SubmitMethodConfigurationComponent.vue';


const props = defineProps({
    action: {
        type: Object as () => IActionConfiguration,
        required: true
    }
})

const components = [
    {
        type: 'Submit',
        component: SubmitMethodConfigurationComponent
    }
]

const component = computed(() => {
    const target =  components.find(c => c?.type == props.action.methodName  )

    if(target == null){
        return undefined
    }
    return target.component;
})

</script>