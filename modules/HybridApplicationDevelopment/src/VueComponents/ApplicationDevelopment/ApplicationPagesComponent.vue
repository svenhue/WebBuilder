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
            <q-list dense>
                <q-item>
                    <q-item-section>
                        <q-item-label>
                            Add Page
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <ButtonComponent icon="add" class="cursor-pointer" @click="viewModel.AddPage()"></ButtonComponent>
                    </q-item-section>
                </q-item>
                <q-item
                v-for="page of viewModel.GetPageEntitys().value"
                :key="page.id"
                clickable
                dense
                v-ripple
                :active="viewModel.currentPage.value.id == page.id"
                @click="viewModel.NavigateToPage(page.name)">
                    <q-item-section>
                        <q-item-label>
                            {{page?.name}}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <ButtonComponent  icon="edit" class="cursor-pointer" @click="() => {selectedPage = page,showEditDialog = true}" ></ButtonComponent>
                        <ButtonComponent icon="delete" class="cursor-pointer" @click="() => {selectedPage = page, showDeletePageDialog = true}"></ButtonComponent>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-dialog v-model="showDeletePageDialog">
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
            </q-dialog>
        

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