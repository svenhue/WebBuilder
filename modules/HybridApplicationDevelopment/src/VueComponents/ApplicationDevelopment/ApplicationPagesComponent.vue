<template>
    <div class="editor-pages">
 
        <div class="drawer-header">
            Pages
            <ButtonComponent class="close-btn" dense unelevated size="10px" icon="close" 
            @click="emits('close')"></ButtonComponent>

        </div>
        <div :style="{
            display: 'flex'
        }">
            <div dense>
                <div>
                    <div-section>
                        <div-label>
                            Add Page
                        </div-label>
                    </div-section>
                    <div-section side>
                        <ButtonComponent icon="add" class="cursor-pointer" @click="viewModel.AddPage()"></ButtonComponent>
                    </div-section>
                </div>
                <div
                v-for="page of viewModel.GetPageEntitys().value"
                :key="page.id"
                clickable
                dense
                v-ripple
                :active="viewModel.currentPage.value.id == page.id"
                @click="viewModel.NavigateToPage(page.name)">
                    <div-section>
                        <div-label>
                            {{page?.name}}
                        </div-label>
                    </div-section>
                    <div-section side>
                        <ButtonComponent  icon="edit" class="cursor-pointer" @click="() => {selectedPage = page,showEditDialog = true}" ></ButtonComponent>
                        <ButtonComponent icon="delete" class="cursor-pointer" @click="() => {selectedPage = page, showDeletePageDialog = true}"></ButtonComponent>
                    </div-section>
                </div>
            </div>

                <UModal  v-model="showDeletePageDialog"> 
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