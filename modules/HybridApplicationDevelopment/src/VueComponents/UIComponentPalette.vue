<template>
    <div class="component-palette">
        <div class="drawer-header">
            Add
            <button 
            class="custom-button custom-button--flat"
            :style="{
                margin: 'auto'
            }"
            @click="navService.AddAndOpenTab({ path: '/marketplace', title: 'Marketplace'})"
            title="Marketplace"
            >
            <i class="material-icons">store</i>
            </button>
            <button class="close-btn custom-button custom-button--flat" @click="emits('close')">
                <i class="material-icons">close</i>
            </button>
        </div>
        <UInput dense v-model="tagFilterString" v-on:update:model-value="(v) => handleFilterChanged()">
        </UInput>
        <UCollapsible label="Basic" dense v-model:open="BasicExpand">
            <UButton
      label="Basic"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Basic')" :key="view.name" clickable class="component-card" 
                    @mousedown="(e) => startElementTransition(e, view.type , )"
                    >
                 
                    <div  class="component-card-image" >
                       <div>
                        <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >  
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['basic'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['basic'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                        </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name">
                            {{ view.name.replace('Component','') }}
                    </div>
            
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Structure" dense v-model:open="StructureExpand">
                 <UButton
      label="Structure"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Structure')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image" >
                        <div>
                            <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['structure'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['structure'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                      
            

                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
                
            </div></template>
        </UCollapsible>
        <UCollapsible label="Navigation" dense v-model:open="NavigationExpand">
                 <UButton
      label="Navigation"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Navigation')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image">
                      <div>
                        <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['navigation'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['navigation'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Typography" dense v-model:open="TypographyExpand">
                 <UButton
      label="Typography"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Typography')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image" >
                        <div>
                            <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['typography'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['typography'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Layout" dense v-model:open="LayoutExpand">
                 <UButton
      label="Layout"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Layout')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image">
                       <div>
                        <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['layout'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['layout'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Media" dense v-model:open="MediaExpand">
                 <UButton
      label="Media"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Media')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image" >
                       <div>
                        <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['media'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['media'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Forms" dense v-model:open="FormsExpand">
                 <UButton
      label="Forms"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Form')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image" >
                        <div>
                            <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['forms'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['forms'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div></template>
        </UCollapsible>
        <UCollapsible label="Data" dense v-model:open="DataExpand">
                 <UButton
      label="Data"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />  <template #content>
            <div class="palette-grid">
                <div v-for="(view, index) in filter('viewdefinition:Data')" :key="view.name" clickable class="component-card" @mousedown="(e) => startElementTransition(e, view.type)">
                    <div :draggable="true"  class="component-card-image" >
                        <div>
                            
                            <NuxtImg v-if="view?.icon != undefined"
                            :src="'/icons/' + view.icon" >    
                        </NuxtImg>
                        <div v-else :style="{width: '50px', height: '50px'}">

                        </div>
                        <UIcon  class="absolute-right" name="info" @mousemove="() => showInfo['data'][index] = true" >
                                <UTooltip 
                                :style="{zIndex: 999999}"
                                    :model-value="showInfo['data'][index]">
                                        {{ GetInfo(view.type) }}
                                    </UTooltip>
                                </UIcon>
                    </div>
                    </div>
                    <div class="component-card-name" >
                            {{ view.name.replace('Component','') }}
                    </div>
                </div>
            </div>
        </template>
        </UCollapsible>
        
        <UCollapsible label="Advanced" dense v-model:open="AdvancedExpand">
                 <UButton
      label="Advanced"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
    />
    <template #content>
            <div>
                <div v-for="(view, index) in filter('viewdefinition:Advanced')" :key="view.name" clickable>
                    <div @mousedown="(e) => startElementTransition(e, view.type)">
                        <div>{{ view.name }}</div>
                        
                    </div>
                   
                    <UIcon name="info" @mousemove="() => showInfo['advanced'][index] = true" >
                        <UTooltip 
                        :style="{zIndex: 99999}"
                        :model-value="showInfo['advanced'][index]">
                            {{ GetInfo(view.type) }}
                        </UTooltip>
                    </UIcon>
                </div>
            </div>
        </template>
        </UCollapsible>
        <UCollapsible label="Your templates" dense v-model:open="YourTemplatesExpand">
            <div>
                <div v-for="view in avaibleTemplates" :key="view.name" clickable>
                    <div @mousedown="(e) => startElementTransition(e, view.type)">
                        <div>{{ view.name }}</div>
                    </div>
                </div>
            </div>
        </UCollapsible>
    </div>
</template>

<script setup lang="ts">
import { div } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'

import { computed, reactive, ref } from 'vue';
import { BORepository, BaseServiceProvider, TabService, useWebNodeTemplateStore } from 'alphautils';
import { GetImageURL } from '../utils/composables/GetImageURL';
import { IViewConfiguration } from 'alphautils';
import { ViewDefinition } from '../utils/Models/ViewDefinition';

const tagFilterString = ref('')
const store = useWebNodeTemplateStore()
const views = computed(() => {
    return store.avaiblenodetemplates.filter(v => v.name != undefined) as Array<IViewConfiguration>
})
const BasicExpand = ref(false)
const StructureExpand = ref(false)
const NavigationExpand = ref(false)
const TypographyExpand  = ref(false)
const LayoutExpand  = ref(false)
const MediaExpand  = ref(false)
const FormsExpand  = ref(false)
const DataExpand  = ref(false)
const AdvancedExpand  = ref(false)
const YourTemplatesExpand  = ref(false)


const showInfo = reactive({
    advanced: [],
    structure: [],
    editor: [],
    data: [],
    forms: [],
    media: [],
    layout: [],
    typography: [],
    navigation: [],
    basic: [],
    action: []

})


const boRepository = BaseServiceProvider.ServiceWithContext<BORepository>("BORepository", 0)
const navService = BaseServiceProvider.ServiceWithContext<TabService>("TabService", 0)
const avaibleTemplates = computed(() => {
    return boRepository.Get("UIViewTemplate", undefined, 0)
})

function handleFilterChanged(){
    if(tagFilterString.value == ''){
        BasicExpand.value = false
        StructureExpand.value = false
        NavigationExpand.value = false
        TypographyExpand.value = false
        LayoutExpand.value = false
        MediaExpand.value = false
        FormsExpand.value = false
        DataExpand.value = false
        AdvancedExpand.value = false
        YourTemplatesExpand.value = false
    }else {
        BasicExpand.value = true
        StructureExpand.value = true
        NavigationExpand.value = true
        TypographyExpand.value = true
        LayoutExpand.value = true
        MediaExpand.value = true
        FormsExpand.value = true
        DataExpand.value = true
        AdvancedExpand.value = true
        YourTemplatesExpand.value = true
    }
}
function filter(type: string){
    if(tagFilterString.value != ''){
        return views.value.filter(v => v.type.startsWith(type) && v?.isDisabled != true && v.type?.toLowerCase()?.includes(tagFilterString.value?.toLowerCase())) 
    }
    return views.value.filter(v => v.type.startsWith(type) && v?.isDisabled != true)
}
function GetInfo(type: string){
    return ViewDefinition.GetInfoOrUndefined(type)
}
const emits = defineEmits(['addComponent', 'close'])

function startElementTransition(e: MouseEvent, type: string){
    e.stopPropagation();
    e.preventDefault();
    AnimateComponentDrag()
    emits('addComponent',e ,type)
}


function AnimateComponentDrag(){
    const el = CreateDragElement()

    document.body.appendChild(el)
    document.addEventListener('mousemove', bindDragElementToMouse)

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', bindDragElementToMouse)
        document.getElementById('dragElement111_123')?.remove()
    })

}

function CreateDragElement(){
    const dragElement = document.createElement('div')
    dragElement.style.position = "absolute"
    dragElement.style.zIndex = "99999"
    dragElement.style.backgroundColor = "white"
    dragElement.style.width = "40px"
    dragElement.style.height = "40px"
    dragElement.style.border = "1px solid black"
    dragElement.style.opacity = "0.5"
    dragElement.id = 'dragElement111_123'
    return dragElement
}


function bindDragElementToMouse(event: MouseEvent){
    const element = document.getElementById('dragElement111_123')

    element.style.top = event.clientY + "px"
    element.style.left = event.clientX + "px"
    
}

</script>

<style scoped lang="scss">
@import '../assets/custom-buttons.css';

.component-palette{
    width: 250px;
.palette-grid{
    column-gap: 5px;
    row-gap: 5px;
    display: grid;
    columns: 4;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    .component-card{
        cursor: pointer;
        width: 70px;
        height: min-content;
        background-color: transparent;
        position: relative;
        
        
        .component-card-image{
            background-color: var(--color-darkgrey);
        }
        .component-card-name{
            width: 100%;
            text-align: center;
            background-color: rgba(0,0,0,0.5);
            color: white;
            padding: 0px;
        }
    }
}
}
</style>
