
<template>
    <ClientOnly>
        <q-layout v-if="viewModel?.isReady.value" view="hHh lpr fFr" >
            <q-header class="dev-toolbar-header">
                <div id="dev-toolbar">
                    
                    <ApplicationDevelopmentToolbar  :view-model="viewModel" :contextid="viewModel?.currentPage?.value" :route="useRoute()">

                    </ApplicationDevelopmentToolbar>

                </div>
            </q-header>
            <q-footer elevated class="dev-toolbar-footer">
                    <TreePathComponent
                    @focus-view="(id) => viewModel.focusView(id, true)">
                        
                    </TreePathComponent>
            </q-footer>
        <q-page-container>
            <q-btn 
            dense 
           
            :icon="optionsBar == true ? 'chevron_right' : 'menu_open'"  
            no-caps  
            @click="optionsBar = !optionsBar"
            :style="buttonStyle">
            </q-btn>
            <q-drawer side="right"  v-model="optionsBar" :width="350" no-swipe-close no-swipe-backdrop no-swipe-open >
                        
                <DevelopmentOptionsDrawer
                @focusView="(view) => viewModel.focusView(view, true)"
                @updateelement="(values) => viewModel.UpdateFocusedElement(values)"
                :contextid="viewModel.model.contextid"
                :currentElement="viewModel.GetFocussedElement()">
                </DevelopmentOptionsDrawer>

            </q-drawer>
            <div class="development-root-component" id="XXX" ref="XXX">
                <LeftDevelopmentOptionsBar 
                :viewModel="viewModel"
                ref="leftBar"
                :contextid="viewModel?.currentPage?.value"
                v-show="showleftBar" 
                @focusView="(view) => viewModel.focusView(view, true)"
                @add-component="(e, type) =>{leftBar.CloseAllTabs(), StartAddNewElement(e, type)}">
                    
                </LeftDevelopmentOptionsBar>
                
                <div
                class="component-navigation-wrapper"
                >
                    <div
                    class="component-wrapper"
                    ref="componentWrapper"
                    @mousemove="(e) => tryFocus(e, false)" 
                    @mousedown="(e) => tryFocus(e, true)"
                    :id="'developmentcomponent_' + viewModel.model.contextid"
                >
                    
                    
                    <BackgroundFacadeComponent :contextid="viewModel?.model?.contextid" class="appbase"ref="facade" v-if="viewModel?.currentPage?.value != -1"  id="development-container">
                        <template #default>
                            <div :style="{
                                width: '100%',
                                height: '100%',
                            zIndex: 10
                            }">

                            <div
                                v-for="page of viewModel.GetPages().value" :key="page"
                                id="mountpoint"
                                :style="{
                                    display: viewModel?.currentPage?.value == page ? '' : 'none'
                                }"
                                >
                                <KeepAlive>
                                    <ComponentTreeBase
                                    v-if="viewModel?.currentPage?.value == page"
                                    :contextid="page"
                                    :view="viewModel.GetRootView(page)">
                                    </ComponentTreeBase>
                                </KeepAlive>
                            </div>
                        
                            </div>
                        </template>
                    </BackgroundFacadeComponent>
                    <div v-else>
                        <div>
                            Oops! Nothing to see here. Please select a page to start developing.
                        </div>
                    </div>
                    </div>
                </div>
                
                <FocussedViewOptionsComponent
                :app-name="viewModel.model.name">

                </FocussedViewOptionsComponent>

                
                <DevelopmentContextBarComponent
                :contextid="viewModel?.currentPage?.value"
                :element="viewModel.GetFocussedElement().value"
                @delete-element="() => viewModel.DeleteElement(viewModel.GetFocussedElement().value?.id)"
                :targetId="'development-container'"
                >

                </DevelopmentContextBarComponent>
                <div :id="'developmentcomponent_container' + viewModel?.model.name">

                </div>
                
            </div>
        </q-page-container>
    </q-layout>
    </ClientOnly>
</template>

<script setup lang="ts">   

import { defineExpose, ref, computed, Ref } from 'vue';
import { useRoute } from 'vue-router'
import { RunTimeVueApplicationViewModel } from '../ViewModels/RuntimeVueApplicationViewModel'
import TreePathComponent from './ApplicationDevelopment/TreePathComponent.vue';
import FocussedViewOptionsComponent from './ApplicationDevelopment/FocussedViewOptionsComponent.vue'
import ApplicationDevelopmentToolbar from './ApplicationDevelopment/ApplicationDevelopmentToolbar.vue'
import { ComponentTreeBase } from 'alphaviewlibrary'
import DevelopmentOptionsDrawer from './DevelopmentOptionsDrawer.vue'
import BackgroundFacadeComponent from './ApplicationDevelopment/BackgroundFacadeComponent.vue';
import LeftDevelopmentOptionsBar from './LeftDevelopmentOptionsBar.vue';
import DevelopmentContextBarComponent from './DevelopmentContextBarComponent.vue';
import { ViewPositioningHelper } from '../utils/Helpers/ViewPositioningHelp';
import {useI18n } from 'vue-i18n';
import { EditorModes } from './ApplicationDevelopment/ApplicationSettings/Enums/EditorModes';
import { useViewPositioning } from '../utils/Helpers/ViewPositioningHelper';
import ApplicationServerTerminal from './ApplicationDevelopment/Code/ApplicationServerTerminal.vue';
import { waitForElm } from 'alphautils';
import { e } from 'vite/dist/node/types.d-FdqQ54oU';


const showleftBar = ref(true)
const optionsBar = ref(true)
const facade = ref(null)
const leftBar = ref(null)
const route = useRoute()
const XXX = ref<HTMLElement>(null)
const solutionname = route.params.appName

const viewModel = new RunTimeVueApplicationViewModel(solutionname, facade, useI18n(), "mountpoint")


const positioningHelper = new ViewPositioningHelper(viewModel)

let newElements = null

const { setNextViewElement, startAddNewComponent } = useViewPositioning(viewModel, 'developmentcomponent_' + viewModel.model.contextid)


function newElementMouseMoveHandler(e: MouseEvent){
    positioningHelper.OnMouseChanged(e, newElements)
}

function addListener(){
    //window.postMessage()
    window.addEventListener('message', (e) => {
        setNextViewElement(e.data)
    })
    
}
addListener()


function StartAddNewElement(e: Event, type: string, values?){
    newElements = viewModel.createElement(type, values)
    document.addEventListener('mousemove', newElementMouseMoveHandler)
                document.addEventListener('mouseup', () => {
                    positioningHelper.OnMouseUp(newElements)
                    document.removeEventListener('mousemove', newElementMouseMoveHandler)
                },{
                    once: true
                })
}
function tryFocus(e, fixed = false){
   
    if(viewModel == undefined){
        return
    }
    if(fixed == true){
        let downTime = true
        document.addEventListener('mouseup', () => {
            downTime = false
        })
        setTimeout(() => {
            if(downTime == true){
                
                positioningHelper.StartRelocatOnMouseDown(e, viewModel.GetFocussedElement().value)
                
            }
        }, 300)
        
    }
    viewModel.tryFocus(e, fixed)
}
const buttonStyle = computed(() => {
    if(optionsBar.value == true){
        return {borderRadius: '15px',   border: '1px solid #1E1E2F', position:'absolute', zIndex:1001, top:'50px', right:'352px', width:'40px',  height:'40px'}
    }
    else{
        return {borderRadius: '15px', border: '1px solid #1E1E2F', position:'absolute', top:'50px', right:'3px', width:'40px', height:'40px', zIndex:1001}
    }
})
defineExpose({
        deleteFocussedView: () => viewModel.deleteFocussedView()
    })

//todo destory viewmodel on unmount
</script>

<style scoped lang="scss">

.dev-toolbar-header{
    background-color: theme('colors.primary-dark');
}
.dev-toolbar-footer{
    display: flex;
    align-content: center;
    align-items: center;
    padding-left: 45px;
    background-color: theme('colors.primary-dark');
    height: 30px;
}
.development-root-component{
   
    position: relative;
    width: 100%;
    height: 91vh;
    overflow: hidden;
    display:flex;

    .component-navigation-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        
       
        .component-wrapper{
            position: relative;
            width: 100%;
            height: 100%;
       
            .app-container{
                margin:auto;
                position: relative;
                width:80%;
            }
        }
        
        
    }

}

</style>
