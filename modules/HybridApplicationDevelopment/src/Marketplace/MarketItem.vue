<template>
        <CardComponent class="market-item" >
            <div class="item-c-s">
                <q-img class="item-c" :src="item.imageUrl"  fit="scale-down">

                    
                </q-img>
            </div>
            <div class="absolute-bottom text-subtitle2 text-left">
                {{ item.name }}
            </div>
        </CardComponent>

</template>

<script setup lang="ts">import { CardComponent } from 'alphaviewlibrary'

import { TemplateDto } from '../VueComponents/ApplicationDevelopment/Features/Templates/TemplateDto';


const props = defineProps({
    item: {
        type: Object as () => TemplateDto,
        required:true
    }
})

</script>

<style lang="scss">
.market-item{

    height: min-content;
    min-height: 100px;
    .item-c-s{
        
        display:flex;
        justify-content: center;
        align-items: center;
        height: min-content;

        .item-c{
            height: min-content;
            
        }
    }
}

</style>