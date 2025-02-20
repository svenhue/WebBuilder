<template>

    <div>
        <q-list>
            <q-item>
            <q-checkbox :label="'Show Dotted Element Borders'" v-model="service.store.devSettings.showDevBorders" @update:model-value="(val) => service.ChangeDevBorderSetting(val)">

            </q-checkbox>
        </q-item>
        <q-item>
            <q-checkbox label="Use default component templates" v-model="service.store.devSettings.useViewTemplates" @update:model-value="(val) => service.ChangeTemplateSetting()">

            </q-checkbox>
        </q-item>
        </q-list>
    </div>
</template>

<script setup lang="ts">
import { ApplicationDevelopmentSettingsService } from './ApplicationDevelopmentSettingsService';
import { BaseServiceProvider } from 'alphautils';

const service = BaseServiceProvider.ServiceWithContext<ApplicationDevelopmentSettingsService>('ApplicationDevelopmentSettingsService', 0) as ApplicationDevelopmentSettingsService;
</script>