//@ts-nocheck
import { IViewConfiguration } from '../View/IViewConfiguration.js';
import { ApplicationModule } from './ApplicationModule.js';
import { ApplicationModes } from './ApplicationModes.js';
import { BusinessObject } from '../Data/BusinessObject.js';
import { DataTypes } from '../Data/DataTypes.js';
import { BOProperty } from '../Data/BOProperty.js';
import { ApplicationDeploymentModes } from './ApplicationDeploymentModes.js';
import { IApplicationConfiguration } from './IApplicationConfiguration.js';
import { IInternationalization } from './Localization/IInternationalization.js';

export class ApplicationConfiguration extends BusinessObject implements IApplicationConfiguration{
    
    id: number;
    name: string;
    rootComponent: IViewConfiguration;
    components: IViewConfiguration[];
    mode?: ApplicationModes
    selector?: string = '#app';
    modules: Array<ApplicationModule>
    isProduction: boolean;
    deploymentMode: ApplicationDeploymentModes
    internationalization: IInternationalization

    constructor(

        config?: IApplicationConfiguration
        ) {
        super({
            propertys:[
                new BOProperty({
                    name: 'id',
                    type: DataTypes.number
                }),
                new BOProperty({
                    name: 'rootComponent',
                    type: DataTypes.object
                }),
                new BOProperty({
                    name: 'components',
                    type: DataTypes.array
                }),
                new BOProperty({
                    name: 'selector',
                    type: DataTypes.string
                }),
                new BOProperty({
                    name: 'mode',
                    type: DataTypes.number
                }),
                new BOProperty({
                    name: 'modules',
                    type: DataTypes.array
                })

            ],
            name: 'ApplicationConfiguration'
        })
        Object.assign(this, config)
    }
}