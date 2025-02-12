//@ts-nocheck
import { App } from 'vue';
import { IApplication } from './IApplication.js';
import { IApplicationComponentFactory } from './IApplicationComponentFactory.js';
import { IApplicationConfiguration } from './IApplicationConfiguration.js';
import { VueApplication } from './VueApplication.js';
import { Router } from 'vue-router';
import { injectable } from 'inversify';
import { ApplicationSettings } from './ApplicationSettings.js';

@injectable()
export class ApplicationFactory{

    public Create(
        config: IApplicationConfiguration,
        factory?: IApplicationComponentFactory,
        app?: App,
        router?: Router,
        settings: ApplicationSettings
    ): IApplication{
        return new VueApplication(config, factory, app, router, settings)
    }
}