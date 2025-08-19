<template>
    <div class="editor-pages">
 
        <div class="drawer-header">
            Pages
            <ButtonComponent class="close-btn" dense unelevated size="10px" :icon="'mdi:close-circle'" 
            @click="emits('close')"></ButtonComponent>

        </div>
        <div :style="{
            display: 'flex'
        }">
            <div dense>
                <div>
                    <div>
                        <div>
                            Add Page
                        </div>
                    </div>
                    <div side>
                        <UButton icon="mdi:add" class="cursor-pointer" @click="viewModel.AddPage()"></UButton>
                    </div>
                </div>
                <div
                v-for="page of viewModel.GetPageEntitys().value"
                :key="page.id"
                clickable
                dense
                :active="viewModel.currentPage.value.id == page.id"
                @click="viewModel.NavigateToPage(page.name)">
                    <div>
                        <div>
                            {{page?.name}}
                        </div>
                    </div>
                    <div side>
                        <UButton  icon="mdi:edit" class="cursor-pointer" @click="() => {selectedPage = page,showEditDialog = true}" ></UButton>
                        <UButton icon="mdi:delete" class="cursor-pointer" @click="() => {selectedPage = page, showDeletePageDialog = true}"></UButton>
                    </div>
                </div>
            </div>

                <UModal  title="Delete Page" description="Delete a Page" v-model="showDeletePageDialog"> 
                    <template #content>
                <CardComponent>
                    <div>
                            Delete Page
                    
                    </div>
                    <div>
                        Are you sure you want to delete this page?
                    </div>
                    <div align="right">
                        <ButtonComponent label="Cancel" color="primary" @click="showDeletePageDialog = false"></ButtonComponent>
                        <ButtonComponent label="Delete" color="negative" @click="() =>{ viewModel.DeletePage(selectedPage.id), showDeletePageDialog = false}"></ButtonComponent>
                    </div>
                </CardComponent>
                </template>
                </UModal>

        

        <EditPageDialog 
        v-if="showEditDialog" 
        :page="selectedPage" 
        @update-page="(value) => updatePage(value)">

        </EditPageDialog>
        </div>
    </div>
</template>

<script setup lang="ts">import { CardComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { inject, ref } from 'vue';
import { RunTimeVueApplicationViewModel } from '../../ViewModels/RuntimeVueApplicationViewModel';
import EditPageDialog from './Pages/EditPageDialog.vue';
import { SimpleNameValueCollection } from 'alphautils';


const viewModel = inject('applicationViewModel') as RunTimeVueApplicationViewModel
const showDeletePageDialog = ref(false)
const showEditDialog = ref(false)
const selectedPage = ref(null)
const emits = defineEmits(['close'])
 defineProps({
    contextid:{
        type: Number,
        required: true
    }
})


function updatePage(value: SimpleNameValueCollection){
 
    viewModel.UpdatePage(selectedPage.value.id, value)
}

</script>

<style lang="scss">
.editor-pages{
    
}
</style>