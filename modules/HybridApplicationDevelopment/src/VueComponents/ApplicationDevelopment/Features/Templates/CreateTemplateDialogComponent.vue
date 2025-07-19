<template>
    <q-dialog :model-value="show">
        <q-card>
            <q-card-section>
                    Create Template based on component {{  value?.publicidentifier }}
                <q-card-section>
                    <InputComponent v-model="template.name" label="Template Name"  />
                    <q-checkbox v-model="template.isPublic" label="Public (everyone can use it for free)"></q-checkbox>
                </q-card-section>
                <q-card-section>
                    <q-uploader ref="Uploader" label="Template image"  hide-upload-btn :filter="checkFileType" @rejected="onRejected">

                    </q-uploader>
                </q-card-section>
                <q-card-section>
                    <div ref="jsoneditorref" id="XXXX" class="jsoneditor1">

                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <ButtonComponent label="Cancel" @click="$emit('close')"  />
                         <ButtonComponent label="Create" @click="() => {CreateTemplate()}"  />

                </q-card-actions>
            </q-card-section>
        </q-card>   
    </q-dialog>

</template>


<script setup lang="ts">import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import {  onMounted, onUnmounted, reactive, ref } from 'vue';
import { UITemplateService } from './UITemplateService';
import { BaseServiceProvider, IApplicationConfiguration, IDataAdapter, IHTTPClientService, IPageConfiguration, IViewConfiguration, waitForElm } from 'alphautils';
import { TemplateDto } from './TemplateDto';
import { UITemplateTypes } from './UITemplateTypes';
import { interfaces} from 'inversify';

import { QUploader, useQuasar } from 'quasar';
import { FocussedViewContextService } from 'alphautils';

let JsonEditor = null;
if (typeof window !== 'undefined') {
    import('jsoneditor').then((module) => {
        JsonEditor = module.default;
    });
}
const props = defineProps({
    contextid: {
        type: Number,
        required: true
    },
    value:{
        type: Object as () => IViewConfiguration | IPageConfiguration | IApplicationConfiguration,
        required: false
    },
    show: {
        type: Boolean,
        required: true
    }

})
const emits = defineEmits(['close'])
defineExpose({
    setView
})

const $q = useQuasar();
const Uploader = ref<QUploader | null>(null);
const jsoneditorref = ref<HTMLElement | null>(null);
const template = reactive<TemplateDto>({
    id: '',
    name: '',
    description: '',
    value: undefined,
    type: UITemplateTypes.ViewTemplate,
    isPublic: false
})


let service = new UITemplateService(
    BaseServiceProvider.ServiceWithContext<interfaces.Newable<IDataAdapter>>("DataAdapterConstructor",props.contextid),
    BaseServiceProvider.ServiceWithContext<IHTTPClientService>("HTTPClientService",props.contextid),
    BaseServiceProvider.ServiceWithContext<FocussedViewContextService>("FocussedViewContextService",props.contextid)
);

onMounted(() => {
    
   

})

function setView(view){
 
    const cleanView = JSON.parse(JSON.stringify(view));

    template.value = service.CreateTemplateValueString(cleanView);
    
    waitForElm('#XXXX').then((elm) => {
        //dont needed yet
        //CreateJsonEditor();
    })
}

onUnmounted(() => {
    UnMountJsonEditor();
})

function CreateJsonEditor(){
    //todo show editor only when permission is granted
    const editor = new JsonEditor(jsoneditorref.value,{
        mode: 'text',
        mainMenuBar: false,
        navigationBar: false,
        statusBar:false,
        onEditable: function() {
            return false
        }
    })

    editor.set(template.value)
}
function UnMountJsonEditor(){

}

function checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
}

function onRejected(rejectedEntries){
    $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
}

async function CreateTemplate(){
    const files = Uploader.value.files;
    
    if(files[0] != undefined){
        const fileString = await ToBase64String(files[0] as File);
        template.imageFileBase64 = fileString;
        template.fileName = files[0].name
    }
    
    service.CreateNewViewTemplate(template);
    emits('close');
}

function ToBase64String(file: File){
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
       
    })

}


</script>


<style lang="scss">

.jsoneditor1{
    textarea{
        min-width: 400px;
        min-height: 100px;
    }
}
</style>