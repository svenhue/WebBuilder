import { HybridAppDevelopmentApplicationModule } from 'hybridappdev/module.js';
//import { ModellingModule } from 'app/modules/Modelling/ModellingModule';
import { ApplicationConfiguration, UtilityModule, IApplicationConfiguration, IPageConfiguration, ApplicationDeploymentModes, type IExternalNetworkConfiguration } from 'alphautils';
import { ApplicationModes } from 'alphautils';
import { config } from './pages';
import { AuthenticationMechanism } from 'alphautils';

 class WebBuilderApplicationConfiguration extends ApplicationConfiguration implements IApplicationConfiguration {
  name = 'WebBuilderr';
  deploymentMode= ApplicationDeploymentModes.spaclient;
  mode = ApplicationModes.extension;
  modules = [new UtilityModule(), new HybridAppDevelopmentApplicationModule()];
  networkConfigs = [
    {
      name: "WebCreatorBackend",
      url: "http://localhost:3001/api",
      authentication:{
        mechanism: AuthenticationMechanism.JWT,
        tokenEndpoint: "http://localhost:3001/api/auth/login",
        username: "sven-huening@web.de",
        password: "I.AM.aSt3ongPW"

      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    } as IExternalNetworkConfiguration
  ] as Array<IExternalNetworkConfiguration>
}

export { WebBuilderApplicationConfiguration}


