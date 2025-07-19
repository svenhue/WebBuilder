<template>

    <div>
        <div>
            <q-item>
            <UCheckbox :label="'Show Dotted Element Borders'" v-model="service.store.devSettings.showDevBorders" @update:model-value="(val) => service.ChangeDevBorderSetting(val)">

            </UCheckbox>
        </q-item>
        <q-item>
            <UCheckbox label="Use default component templates" v-model="service.store.devSettings.useViewTemplates" @update:model-value="(val) => service.ChangeTemplateSetting()">

            </UCheckbox>
        </q-item>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ApplicationDevelopmentSettingsService } from './ApplicationDevelopmentSettingsService';
import { BaseServiceProvider } from 'alphautils';

const service = BaseServiceProvider.ServiceWithContext<ApplicationDevelopmentSettingsService>('ApplicationDevelopmentSettingsService', 0) as ApplicationDevelopmentSettingsService;
</script>