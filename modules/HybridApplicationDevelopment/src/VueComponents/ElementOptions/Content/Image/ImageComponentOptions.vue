<template>
    <div>
        
        <StaticContentSourceInputComponent
        :url="currentElement?.properties?.src ?? ''"
        @updateUrl="(val) => updateImageSrc(val)">

        </StaticContentSourceInputComponent>
        
    </div>
</template>


<script setup lang="ts">
import { ImageSource } from 'alphaviewlibrary';
import { ref } from 'vue'
import StaticContentSourceInputComponent from '../StaticContentSourceInputComponent.vue'
const props = defineProps({
    currentElement: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['updateElement'])


const sourceType = ref<ImageSource>(ImageSource.storage);
const sourceOptions = (Object.keys(ImageSource) as Array<keyof typeof ImageSource>).map((value) => {
    return value;
})

function updateImageSrc(val){
    console.log(val)
    emits('updateElement', [{key:'properties.src', value: val}])

}

</script>