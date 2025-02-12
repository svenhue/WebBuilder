<template>
    <div v-if="viewCopy?.id != undefined">
        <div>
            <q-expansion-item dense label="Content" v-if="optionsComponent != undefined">
                <component :is="optionsComponent" @updateElement="(values) => emits('updateElement', values)" :currentElement="viewCopy"></component>
            </q-expansion-item>
            <q-expansion-item dense label="Appearence" v-if="appearenceComponent != undefined ">
                <component :is="appearenceComponent" @updateElement="(values) => emits('updateElement', values)" :currentElement="viewCopy"></component>

            </q-expansion-item>
            
            <q-expansion-item dense label="Behavior" v-if="behaviorComponent != undefined ">
                <component :is="behaviorComponent" @updateElement="(values) => emits('updateElement', values)" :currentElement="viewCopy"></component>

            </q-expansion-item>
            <q-expansion-item dense label="Interaction" v-if="interactionsComponent != undefined">
                <component :is="interactionsComponent" @updateElement="(values) => emits('updateElement', values)" :currentElement="viewCopy"></component>  
            </q-expansion-item>
            
            <q-expansion-item dense label="Configuration">
                <div style="
                    width: 150px;
                    height: 300px
                " :id="'jsoneditor_1'">
                
                    <TextInputEditorComponent
                    :contextid="viewCopy?.contextid"
                    :requestingComponent="view.value"
                    :mode="'onlyExpression'"
                    :value="viewCopy?.properties?.showIf ?? ''"
                    @updateValue="(val) => {emits('updateElement', UpdateShowIf(val))}"
                    :label="'Show if'">

                    </TextInputEditorComponent>
                </div>
            </q-expansion-item>
            
        </div>
        <div>

                
        </div>
    </div>
    <div v-else>
    </div>

</template>

<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue';
//import {  JSONEditor } from 'alphaviewlibrary';
import TableContentComponent from './Content/Table/TableContentComponent.vue'; 
import ImageComponentOptions from './Content/Image/ImageComponentOptions.vue';
import { IViewConfiguration, KeyValuePair, waitForElm } from 'alphautils';
import HeadingComponentContent from './Content/Heading/HeadingComponentContent.vue'
import InputComponentContent from './Content/Input/InputComponentContent.vue'
import TableInteractionsComponent from './Content/Table/TableInteractionsComponent.vue';
import ButtonContentComponent from './Content/Button/ButtonContentComponent.vue';
import FormContentComponent from './Content/Form/FormContentComponent.vue';
import InputInteractionComponent from './Interaction/Input/InputInteractionComponent.vue';
import SelectContentComponent from './Content/Select/SelectContentComponent.vue';
import SelectInteractionComponent from './Interaction/Input/SelectInteractionComponent.vue';
import CheckboxContentComponent from './Content/CheckBox/CheckboxContentComponent.vue';
import VideoContentComponent from './Content/Video/VideoContentComponent.vue';
import ExpansionItemContentComponent from './Content/ExpansionItem/ExpansionItemContentComponent.vue';
import CarouselBehaviorComponent from './Content/Caoursel/CarouselBehaviorComponent.vue';
import CarouselContentComponent from './Content/Caoursel/CarouselContentComponent.vue';
import CarouselAppearenceComponent from './Content/Caoursel/CarouselAppearenceComponent.vue';
import HeaderComponentContent from './Content/Layout/HeaderComponentContent.vue';
import TextInputEditorComponent from 'alphaviewlibrary/src/Editor/TextInputEditorComponent.vue';
import ButtonAppearenceComponent from './Content/Button/ButtonAppearenceComponent.vue';
import LinkOptionsComponent from './Content/Link/LinkOptionsComponent.vue';
import AvatarComponent from 'alphaviewlibrary/src/Basic/AvatarComponent.vue';
import AvatarContentComponent from './Content/Avatar/AvatarContentComponent.vue';
import DialogBehaviorComponent from './Content/Dialog/DialogBehaviorComponent.vue';
import BadgeContentComponent from './Content/Badge/BadgeContentComponent.vue';
import TabbedContainerContentComponent from './Content/TabbedContainer/TabbedContainerContentComponent.vue';
import TabbedContainerAppereanceComponent from './Content/TabbedContainer/TabbedContainerAppereanceComponent.vue';
import DropdownMenuContentComponent from './Content/DropdownMenu/DropdownMenuContentComponent.vue';

const emits = defineEmits(['updateElement'])

const props = defineProps({
    view: {
        type: Object as () => ComputedRef<IViewConfiguration>,
        required: true
    }
})
let editor = null;
let viewCopy = ref<IViewConfiguration>()

const components = [
    {
        type: 'DropdownMenuComponent',
        component: DropdownMenuContentComponent
    },
    {
        type: "TabbedContainerComponent",
        component: TabbedContainerContentComponent
    },
    {
        type: 'FormComponent',
        component: FormContentComponent
    },
    {
        type: 'ImageComponent',
        component: ImageComponentOptions
    },
    {
        type: 'HeadingComponent',
        component: HeadingComponentContent
    },
    {
        type: 'InputComponent',
        component: InputComponentContent
    },
    {
        type: 'TableComponent',
        component: TableContentComponent
    },
    {
        type: 'ButtonComponent',
        component: ButtonContentComponent
    },
    {
        type: 'SelectComponent',
        component: SelectContentComponent
    },
    {
        type: 'CheckBoxComponent',
        component: CheckboxContentComponent
    },
    {
        type: 'VideComponent',
        component: VideoContentComponent
    },
    {
        type: "ExpansionItemComponent",
        component: ExpansionItemContentComponent
    },
    {
        type: "CarouselComponent",
        component: CarouselContentComponent
    },
    {
        type: "HeaderComponent",
        component: HeaderComponentContent
    },
    {
        type: "LinkComponent",
        component: LinkOptionsComponent
    },
    {
        type: "AvatarComponent",
        component: AvatarContentComponent
    },
    {
        type:"BadgeComponent",
        component: BadgeContentComponent
    }
]

const interactionComponents = [
    {
        type: 'TableComponent',
        component: TableInteractionsComponent
    },
    {
        type: 'InputComponent',
        component: InputInteractionComponent
    },
    {
        type: 'SelectComponent',
        component: SelectInteractionComponent
    }
]

const behaviorComponents= [
    {
        type: 'CarouselComponent',
        component: CarouselBehaviorComponent
    },
    {
        type: 'DialogComponent',
        component: DialogBehaviorComponent
    }
]


const appearenceComponents = [
    {
        type: 'CarouselComponent',
        component: CarouselAppearenceComponent
    },
    {
        type: 'ButtonComponent',
        component: ButtonAppearenceComponent
    },
    {
        type: 'TabbedContainerComponent',
        component: TabbedContainerAppereanceComponent
    }
]

const behaviorComponent = computed(() => {
    if(viewCopy.value?.id == undefined || viewCopy.value == null) return undefined
    const tag = viewCopy.value?.tag.substring(viewCopy.value?.tag.lastIndexOf(':') + 1)
    return behaviorComponents.find(m => m.type === tag)?.component
})
const optionsComponent = computed(() => {
    if(viewCopy.value?.id == undefined || viewCopy.value == null) return undefined
    const tag = viewCopy.value?.tag.substring(viewCopy.value?.tag.lastIndexOf(':') + 1)
    return components.find(m => m.type === tag)?.component
})

const appearenceComponent = computed(() => {
    if(viewCopy.value?.id == undefined || viewCopy.value == null) return undefined
    const tag = viewCopy.value?.tag.substring(viewCopy.value?.tag.lastIndexOf(':') + 1)
    return appearenceComponents.find(m => m.type === tag)?.component
})

const interactionsComponent = computed(() => {
    if(viewCopy.value?.id == undefined || viewCopy.value == null) return undefined
    const tag = viewCopy.value?.tag.substring(viewCopy.value?.tag.lastIndexOf(':') + 1)
    return interactionComponents.find(m => m.type === tag)?.component
})


function SetElement(view: IViewConfiguration){
    if(view == undefined || view == null) return
    viewCopy.value = JSON.parse(JSON.stringify(view))
    editor?.set(viewCopy.value)
} 

SetElement(props.view.value)
defineExpose({
    SetElement
})

waitForElm('#jsoneditor_1').then((elm) => {
    const container = elm
    const options = {
        mode: 'text',
        mainMenuBar: false,
        navigationBar: false,
        statusBar:false,
        onEditable: function() {
            return false
        }
    }
    
    //editor = new JSONEditor(container, options)  
    //editor.set(viewCopy.value)    
})

function UpdateShowIf(val){
    emits('updateElement', [{key: 'properties.showIf', value: val}])

    const key = props.view?.value?.key ?? 0;  
  
    emits('updateElement', [{key: 'key', value: key+ 1}])
    
}
</script>

<style>

.editor-input-label{
    font-size: medium;
}
</style>
