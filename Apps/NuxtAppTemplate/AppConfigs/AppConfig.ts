
//this file will replace by the generated app config

//import { ModellingModule } from 'app/modules/Modelling/ModellingModule';
import { ApplicationConfiguration, UtilityModule, IApplicationConfiguration, IPageConfiguration, ApplicationDeploymentModes, IExternalNetworkConfiguration } from 'alphautils';
import { ApplicationModes } from 'alphautils';
import { config } from './pages';
import { AuthenticationMechanism } from 'alphautils';
import { IApplicationModule } from 'alphautils/app/IApplicationModule.ts';

 class WebBuilderApplicationConfiguration extends ApplicationConfiguration implements IApplicationConfiguration {
  override name = 'WebBuilder';
  override deploymentMode= ApplicationDeploymentModes.spaclient ; 
  override mode = ApplicationModes.extension as ApplicationModes;
  override modules = [new UtilityModule()] as IApplicationModule[];
  networkConfigs = [
    {
      name: "NuxtAppTemplate",
      url: "https://localhost:44314/",
      authentication:{
        mechanism: AuthenticationMechanism.UserCredentials,
        tokenEndpoint: "https://localhost:44314/connect/token/",
        authEndpoint: "https://localhost:44314/connect/authorize",
        client_id: "WebCreator_App",
        client_secret: "",
        grant_type: "password",
        username: undefined,
        password: undefined

      },
      headers: {
        'Content-Type': 'application/json'
      }
    } 
  ] as IExternalNetworkConfiguration[]
}

export { WebBuilderApplicationConfiguration}
