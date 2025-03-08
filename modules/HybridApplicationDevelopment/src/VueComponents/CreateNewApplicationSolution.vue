<template>
    <q-stepper
    v-model="step"
    :ref="stepper"
    animated
    >
        <q-step :name="1" title="Create New Application Solution" :done="step > 1">
            <div class="application-dialog">
                <q-input for="pöUJbowqleriub2341245" v-model="ApplicationSolutionObject.name" label="Name" :rules="[ val => val != '' || 'Please type a name']"></q-input>
                <q-select for="pöUJbowqleriub2341245123" :options="typeoptions" option-value="1" v-model="ApplicationSolutionObject.type" label="Type"></q-select>
                <q-select for="pöUJbowqleriub234124512341"  v-show="ApplicationSolutionObject.type == 'Application'" :options="apptypes" option-value="1" v-model="ApplicationSolutionObject.deploymentMode" label="Application Type"></q-select>

                <q-stepper-navigation>
                    <q-btn @click="step = 2" label="Continue"></q-btn>
                </q-stepper-navigation>
            </div>
        </q-step>
        <q-step :name="2" title="Select storage" :done="step > 2">
            <div class="application-dialog">
                <ConfigureRepository ref="repositoryconfig">

                </ConfigureRepository>
            </div>
            <q-stepper-navigation>
                    <q-btn @click="createSolution()" label="Create"></q-btn>
            </q-stepper-navigation>
        </q-step>
    </q-stepper>
</template>

<script setup lang="ts">
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

function createSolution(){
    const repository = repositoryconfig.value.model
    if(repository == undefined){
        throw new Error('Repository is not defined')
    }
    ApplicationSolutionObject.remoteRepository = repository;

    service.CreateNewApplication(ApplicationSolutionObject)
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
