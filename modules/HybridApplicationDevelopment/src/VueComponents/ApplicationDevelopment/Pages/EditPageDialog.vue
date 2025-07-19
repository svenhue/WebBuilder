<template>
    <CardComponent class="designer-page-edit">
        <div>
            Edit Page
        </div>
        
        
        <div>
            <InputComponent label="Url" :model-value="page.route" @update:model-value="(val) => $emit('updatePage', [{key: 'route', value: val}])">
            </InputComponent>
            <InputComponent label="Name" :model-value="page.name" @update:model-value="(val) => $emit('updatePage', [{key: 'name', value: val}])">
            </InputComponent>
        </div>
        <div>
            <div>
                Meta
            </div>
            <InputComponent label="Title" :model-value="page.meta.title" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.title', value: val}])">
            </InputComponent>
            <InputComponent label="Description" :model-value="page.meta.description" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.description', value: val}])">
            </InputComponent>
            <SelectComponent dense :options="pageKeywordOptions" :model-value="page.meta.keywords" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.keywords', value: val}])">
                <template v-slot:before>
                    <div class="editor-input-label">
                        Keywords
                    </div>
                </template>
            </SelectComponent>

        </div>
        
    </CardComponent>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { CardComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'

import { IPageConfiguration } from 'alphautils';

defineProps({
    page: {
        type: Object as () => IPageConfiguration,
        required: true
    }
})
defineEmits(['updatePage'])
const pageKeywordOptions = [

]
</script>

<style lang="scss">

.designer-page-edit{
    min-width: 400px
}

</style>