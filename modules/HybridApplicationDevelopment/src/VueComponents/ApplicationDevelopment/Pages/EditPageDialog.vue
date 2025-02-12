<template>
    <q-card class="designer-page-edit">
        <q-card-section>
            Edit Page
        </q-card-section>
        
        
        <q-card-section>
            <q-input label="Url" :model-value="page.route" @update:model-value="(val) => $emit('updatePage', [{key: 'route', value: val}])">
            </q-input>
            <q-input label="Name" :model-value="page.name" @update:model-value="(val) => $emit('updatePage', [{key: 'name', value: val}])">
            </q-input>
        </q-card-section>
        <q-card-section>
            <div>
                Meta
            </div>
            <q-input label="Title" :model-value="page.meta.title" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.title', value: val}])">
            </q-input>
            <q-input label="Description" :model-value="page.meta.description" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.description', value: val}])">
            </q-input>
            <q-select dense :options="pageKeywordOptions" :model-value="page.meta.keywords" @update:model-value="(val) => $emit('updatePage', [{key: 'meta.keywords', value: val}])">
                <template v-slot:before>
                    <div class="editor-input-label">
                        Keywords
                    </div>
                </template>
            </q-select>

        </q-card-section>
        
    </q-card>
</template>

<script setup lang="ts">
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