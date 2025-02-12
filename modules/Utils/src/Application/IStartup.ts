import { Container } from 'inversify';
import { IApplicationConfiguration } from './IApplicationConfiguration.js';
import { Pinia } from 'pinia';

export interface IStartup{

    InitializeServices(container: Container, config: IApplicationConfiguration, pinia: Pinia): void
}