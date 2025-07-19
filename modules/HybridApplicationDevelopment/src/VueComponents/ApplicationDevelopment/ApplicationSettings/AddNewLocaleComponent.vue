<template>
    <div :style="{zIndex: 9999}">
        <ButtonComponent dense icon="add" @click="show = !show">

        </ButtonComponent>

       
            <CardComponent v-show="show" :style="{zIndex: 9999}">
                <div>
                    <q-select  :style="{zIndex: 99999}" v-model="newLocale" label="Locale" :options="viewModel.GetNotUsedLocales()"></q-select>
                </div>
                <div>
                    <ButtonComponent label="Cancel" :style="{color: 'black'}" @click="show = false"></ButtonComponent>
                    <ButtonComponent label="Add" @click="addLocale" :style="{color: 'black'}"></ButtonComponent>
                </div>
            </CardComponent>
      
    </div>
</template>


<script setup lang="ts">import { CardComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { ref } from 'vue';
import { InternationalizationViewModel } from '../../../utils/Features/Internationalization/InternationalizationViewModel';

const props = defineProps({
    viewModel: {
        required: true,
        type: InternationalizationViewModel
    }
})


const show = ref(false)

const newLocale = ref('')

const emits = defineEmits(['addLocale'])
function addLocale() {
    emits('addLocale', newLocale.value)
    show.value = false
}



</script>

<style lang="scss">

.XXXXXX * {
    z-index: 9999;

}

</style>
