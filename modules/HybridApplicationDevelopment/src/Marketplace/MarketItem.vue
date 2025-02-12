<template>
        <q-card class="market-item" >
            <q-card-section class="item-c-s">
                <q-img class="item-c" :src="item.imageUrl"  fit="scale-down">

                    
                </q-img>
            </q-card-section>
            <q-card-section class="absolute-bottom text-subtitle2 text-left">
                {{ item.name }}
            </q-card-section>
        </q-card>

</template>

<script setup lang="ts">
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