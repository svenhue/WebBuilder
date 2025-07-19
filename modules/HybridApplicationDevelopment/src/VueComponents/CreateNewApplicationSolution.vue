<template>
    <q-stepper
    v-model="step"
    :ref="stepper"
    animated
    >
        <q-step :name="1" title="Create New Application Solution" :done="step > 1">
            <div class="application-dialog">
                <InputComponent for="pöUJbowqleriub2341245" v-model="ApplicationSolutionObject.name" label="Name" :rules="[ val => val != '' || 'Please type a name']"></InputComponent>
                <SelectComponent for="pöUJbowqleriub2341245123" :options="typeoptions" option-value="1" v-model="ApplicationSolutionObject.type" label="Type"></SelectComponent>
                <SelectComponent for="pöUJbowqleriub234124512341"  v-show="ApplicationSolutionObject.type == 'Application'" :options="apptypes" option-value="1" v-model="ApplicationSolutionObject.deploymentMode" label="Application Type"></SelectComponent>


            <q-stepper-navigation>
                    <ButtonComponent @click="createSolution()" label="Create"></ButtonComponent>
            </q-stepper-navigation>            </div>
        </q-step>

    </q-stepper>
</template>

<script setup lang="ts">import { SelectComponent } from 'alphaviewlibrary'
import { InputComponent } from 'alphaviewlibrary'
import { ButtonComponent } from 'alphaviewlibrary'

import { ApplicationConfiguration, IApplicationConfiguration } from 'alphautils';
import { reactive, ref } from 'vue';
import { ApplicationDevelopmentTypes } from '../utils/Application/ApplicationDevelopmentTypes';
import { ApplicationTypes } from '../utils/Application/ApplicationTypes';
import { BaseServiceProvider } from 'alphautils';
import { ApplicationService } from '../utils/Services/Development/ApplicationService';
import ConfigureRepository from '../utils/Features/VersionManagement/ConfigureRepository.vue';
const emits = defineEmits(['close']);

const repositoryconfig = ref(null)
const step = ref(1)
const stepper = ref(null)

const ApplicationSolutionObject = reactive<IApplicationConfiguration>({name: ''});
const typeoptions = Object.values(ApplicationDevelopmentTypes)
const apptypes = Object.values(ApplicationTypes)

const service = BaseServiceProvider.Service<ApplicationService>('ApplicationService')

async function createSolution(){
    //ApplicationSolutionObject.remoteRepository = repository;

    await service.CreateNewApplication(ApplicationSolutionObject)
}

function close(){
    emits('close')
}
</script>

<style scoped lang="scss">
.diagram-dialog{
    width: 500px;
    background-color: theme('colors.primary');
    .placeholder{
        height:auto;
    }
    .btn-right{
        margin: 10px;
    }
    .btn-left{
       margin:10px;
    }
}
</style>
