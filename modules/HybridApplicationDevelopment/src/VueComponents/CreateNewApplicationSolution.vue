<template>
    <div class="application-dialog">
        <q-input for="pöUJbowqleriub2341245" v-model="ApplicationSolutionObject.name" label="Name" :rules="[ val => val != '' || 'Please type a name']"></q-input>
        <q-select for="pöUJbowqleriub2341245123" :options="typeoptions" option-value="1" v-model="ApplicationSolutionObject.type" label="Type"></q-select>
        <q-select for="pöUJbowqleriub234124512341"  v-show="ApplicationSolutionObject.type == 'Application'" :options="apptypes" option-value="1" v-model="ApplicationSolutionObject.type" label="Application Type"></q-select>

        <div class="placeholder"></div>
        <q-btn class="btn-left" label="Cancel" @click="close()"></q-btn>
        <q-btn  class="btn-right"  label="Create" @click="createSolution()"></q-btn>
    </div>
</template>

<script setup lang="ts">
import { ApplicationConfiguration, IApplicationConfiguration } from 'alphautils';
import { reactive } from 'vue';
import { ApplicationDevelopmentTypes } from '../utils/Application/ApplicationDevelopmentTypes';
import { ApplicationTypes } from '../utils/Application/ApplicationTypes';
import { BaseServiceProvider } from 'alphautils';
import { ApplicationService } from '../utils/Services/Development/ApplicationService';
const emits = defineEmits(['close']);

const ApplicationSolutionObject = reactive<IApplicationConfiguration>({name: ''});
const typeoptions = Object.values(ApplicationDevelopmentTypes)
const apptypes = Object.values(ApplicationTypes)

const service = BaseServiceProvider.Service<ApplicationService>('ApplicationService')

function createSolution(){
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
