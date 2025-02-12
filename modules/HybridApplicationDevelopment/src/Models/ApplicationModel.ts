import { ApplicationDeploymentModes, ApplicationModes, IApplicationConfiguration, IExternalNetworkConfiguration, IPageConfiguration, IViewConfiguration } from "alphautils";
import { IAuthenticationConfiguration } from "alphautils/src/Application/Authentication/IAuthenticationConfiguration";
import { IInternationalization } from "alphautils/src/Application/Localization/IInternationalization";
import { IApplicationStyleSheets } from "alphautils/src/Application/Stylesheets/IApplicationStyleSheets";
import { IGlobalApplicationVariables } from "alphautils/src/Application/Variables/IGlobalApplicationVariables";
import { ITask } from "alphanodes";

export class ApplicationModel implements IApplicationConfiguration{

    public name: string 

    public pages: IPageConfiguration[]; // we dont use this because we dont want deeply nested reactive props
    public pageIds: number[]; // instead we use this

    public version: string;
    public id: number;
    public deploymentMode: ApplicationDeploymentModes;
    public stylesheets?: IApplicationStyleSheets; 
    public ssr: boolean;
    public rootComponent?: IViewConfiguration;
    public globalVariables?: IGlobalApplicationVariables;
    public authentication?: IAuthenticationConfiguration;
    public networkConfigs?: IExternalNetworkConfiguration[];

    public querys?: ITask[]; // we dont use these either
    public queryIds?: string[]; // instead we use this

    public mode?: ApplicationModes;
    public isProduction: boolean;
    public internationalization: IInternationalization;
    

    public initialize(): void {
        throw new Error("Method not implemented.");
    }
    constructor(
        config: IApplicationConfiguration
    ){
        Object.assign(this, config)
    }
}