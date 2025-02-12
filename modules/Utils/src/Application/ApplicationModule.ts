import { IViewConfiguration } from '../View/IViewConfiguration.js';

export class ApplicationModule{
    components: Array<IViewConfiguration>
    name: string

    constructor(name?: string, components?: Array<IViewConfiguration>){
        this.name = name
        this.components = components
    }
}