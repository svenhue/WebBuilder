import { HybridAppDevelopmentApplicationModule } from 'hybridappdev/module.js';
//import { ModellingModule } from 'app/modules/Modelling/ModellingModule';
import { ApplicationConfiguration, UtilityModule, IApplicationConfiguration, IPageConfiguration, ApplicationDeploymentModes, type IExternalNetworkConfiguration } from 'alphautils';
import { ApplicationModes } from 'alphautils';
import { config } from './pages';
import { AuthenticationMechanism } from 'alphautils';
import { WebAutomateIntelligenceModule } from 'webautomateintelligence'
 class WebBuilderApplicationConfiguration extends ApplicationConfiguration implements IApplicationConfiguration {
  name = 'WebBuilderr';
  deploymentMode= ApplicationDeploymentModes.spaclient;
  mode = ApplicationModes.extension;
  modules = [new UtilityModule(), new HybridAppDevelopmentApplicationModule(), new WebAutomateIntelligenceModule()];
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


