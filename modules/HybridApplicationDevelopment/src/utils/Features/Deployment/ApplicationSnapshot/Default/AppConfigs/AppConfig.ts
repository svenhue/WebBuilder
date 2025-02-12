import { HybridAppDevelopmentApplicationModule } from 'hybridappdev/module.js';
//import { ModellingModule } from 'app/modules/Modelling/ModellingModule';
import { ApplicationConfiguration, UtilityModule, IApplicationConfiguration, IPageConfiguration, ApplicationDeploymentModes } from 'alphautils';
import { ApplicationModes } from 'alphautils';
import { config } from './pages';
import { AuthenticationMechanism } from 'alphautils/app/Authentication/AuthenticationMechanism.ts';

 class WebBuilderApplicationConfiguration extends ApplicationConfiguration implements IApplicationConfiguration {
  name = 'WebBuilderr';
  deploymentMode= ApplicationDeploymentModes.spaclient;
  mode = ApplicationModes.extension;
  modules = [new UtilityModule(), new HybridAppDevelopmentApplicationModule()];
  networkConfigs = [
    {
      name: "WebCreatorBackend",
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
    } as IExternalNetworkConfiguration
  ] as Array<IExternalNetworkConfiguration>
}

export { WebBuilderApplicationConfiguration}


