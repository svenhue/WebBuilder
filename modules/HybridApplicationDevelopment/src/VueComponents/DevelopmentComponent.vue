
<template>
    <q-layout v-if="viewModel?.isReady.value">
    <div class="development-root-component" id="XXX" ref="XXX">
        <LeftDevelopmentOptionsBar 
        :viewModel="viewModel"
        ref="leftBar"
        :contextid="viewModel?.currentPage?.value"
        v-show="showleftBar" 
        @focusView="(view) => viewModel.focusView(view, true)"
        @add-component="(e, type) =>{leftBar.CloseAllTabs(), StartAddNewElement(e, type)}">
            
        </LeftDevelopmentOptionsBar>
        <Teleport :to="'body'">
            <TreePathComponent
            @focus-view="(id) => viewModel.focusView(id, true)">
                
            </TreePathComponent>
        </Teleport>
        <div
     
        class="component-navigation-wrapper"
        >
                <q-btn dense rounded :icon="optionsBar == true ? 'close' : 'menu_open'"  no-caps  @click="optionsBar = !optionsBar"
                    :style="buttonStyle">
                    </q-btn>
                <q-drawer side="right"  v-model="optionsBar" :width="350" no-swipe-close no-swipe-backdrop no-swipe-open >
                  
                    <DevelopmentOptionsDrawer
                    :style="{
                        position: 'absolute',
                    }"
                    @focusView="(view) => viewModel.focusView(view, true)"
                    @updateelement="(values) => viewModel.UpdateFocusedElement(values)"
                    :contextid="viewModel.model.contextid"
                    :currentElement="viewModel.GetFocussedElement()">
                    </DevelopmentOptionsDrawer>
                </q-drawer>
   
            <div
            class="component-wrapper"
            ref="componentWrapper"
             @mousemove="(e) => tryFocus(e, false)" 
            @mousedown="(e) => tryFocus(e, true)"
            :id="'developmentcomponent_' + viewModel.model.contextid"
           >
            <ApplicationDevelopmentToolbar  :view-model="viewModel" :contextid="viewModel?.currentPage?.value" :route="useRoute()">

            </ApplicationDevelopmentToolbar>
            <div class="app-container">
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
                            width: '100%',
                            height: '100%',
                           
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
        </div>
        
        <FocussedViewOptionsComponent
        :app-name="viewModel.model.name">

        </FocussedViewOptionsComponent>

        
        <DevelopmentContextBarComponent
        :contextid="viewModel?.currentPage?.value"
        :element="viewModel.GetFocussedElement().value"
        @delete-element="() => viewModel.DeleteElement(viewModel.GetFocussedElement().value?.id)"
        :targetId="'development-container'">

        </DevelopmentContextBarComponent>
        <div :id="'developmentcomponent_container' + viewModel?.model.name">

        </div>
    </div>
</q-layout>
</template>

<script setup lang="ts">   
//@ts-ignore 
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
        return {position:'absolute', zIndex:1001, top:'20px', right:'355px', width:'30px',  height:'30px'}
    }
    else{
        return {position:'absolute', top:'20px', right:'10px', width:'30px', height:'20px', zIndex:1001}
    }
})

const height = computed(() => {
    const el = XXX.value

    if(el == undefined){
        return "80%"
    }
    return el?.offsetHeight ?? 0 - 136 + 'px'
})
defineExpose({
       
        deleteFocussedView: () => viewModel.deleteFocussedView()
    })

//todo destory viewmodel on unmount
</script>

<style scoped lang="scss">
.development-root-component{
   
    position: relative;
    width: 100%;
    height: 100%;
    
    display:flex;
    
    .component-navigation-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
       
        .component-wrapper{
            position: relative;
            width: 100%;
            height: 100%;
            margin-top: 10px;
          
            .app-container{
            
           
            margin:auto;
            position: relative;
            width:80%;
      
           

            .appbase{
                
                position: inherit;
                left: 50%;
                transform: translate(-50%);
                
            
        }
        }
        }
        
        
    }

}

</style>
