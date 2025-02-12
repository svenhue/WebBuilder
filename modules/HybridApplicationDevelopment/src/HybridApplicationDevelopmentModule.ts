//@ts-ignore
//@ts-nocheck
import { ApplicationModule, IExternalNetworkConfiguration } from 'alphautils';
import { useWebNodeTemplateStore } from 'alphautils';
import { ViewConfigs as templates, type ICodeEditorService } from 'alphaviewlibrary'
import { Container, ContainerModule } from 'inversify';
import { ViewConfigurationService } from './utils/Services/ViewConfigurationService';
import { ViewElementFactory } from './utils/ViewElementFactory';
import { GridDesignerServive } from './utils/Services/Designer/GridDesignerService';
import { FocussedViewContextService } from './utils/Services/Designer/FocussedViewContextService';
import { ApplicationService } from './utils/Services/Development/ApplicationService';
import { CommandPaletteService } from './utils/CommandPalette/Services/CommandPaletteService';
import { IApplicationModule } from 'alphautils';
import { MediaResourceManager } from './utils/Services/Resources/MediaResourceManager';
import { CodeCompletionProvider } from './VueComponents/Editor/CodeEditor/CodeCompletionProvider';
import { CodeEditorService } from './VueComponents/Editor/CodeEditor/CodeEditorService';
import { CodeContextProvider } from 'alphautils';
import { ViewChangedAgendsProvider } from './utils/Agents/DesignerAgents/ViewChangedAgendsProvider';
import { Pinia } from 'pinia';
import { AuthenticationMechanism } from 'alphautils';
import { ApplicationDevelopmentSettingsService } from './VueComponents/ApplicationDevelopment/ApplicationSettings/ApplicationDevelopmentSettingsService';
import { EditModeFeature } from './utils/Features/EditMode/EditModeFeature';
export class HybridAppDevelopmentApplicationModule extends ApplicationModule implements IApplicationModule
{
  
  name='HybridApplicationDevelopment'
 
  
  cssStyles: [
    
  ]
  register(app: object, pinia: Pinia){
    const store = useWebNodeTemplateStore(pinia)
    store.addTemplates(templates.default.views);
  }
  async InitializeServices(container: Container){
  
    const module = new ContainerModule(
        (bind) => {
          bind<ViewElementFactory>("ViewElementFactory").to(ViewElementFactory).inSingletonScope();
          bind<FocussedViewContextService>("FocussedViewContextService").to(FocussedViewContextService).inSingletonScope();

          bind<ViewConfigurationService>("ViewConfigurationService").to(ViewConfigurationService).inSingletonScope();
          bind<GridDesignerServive>("GridDesignerServive").to(GridDesignerServive).inSingletonScope();

          bind<MediaResourceManager>("MediaResourceManager").to(MediaResourceManager).inSingletonScope();

          bind<ApplicationService>("ApplicationService").to(ApplicationService).inSingletonScope();

          bind<CommandPaletteService>("CommandPaletteService").to(CommandPaletteService).inSingletonScope();

          bind<CodeCompletionProvider>("CodeCompletionProvider").to(CodeCompletionProvider).inSingletonScope();

          bind<ICodeEditorService>("CodeEditorService").to(CodeEditorService).inSingletonScope();

          bind<CodeContextProvider>("CodeContextProvider").to(CodeContextProvider).inSingletonScope();

          bind<ViewChangedAgendsProvider>("ViewChangedAgendsProvider").to(ViewChangedAgendsProvider).inSingletonScope();

          bind<ApplicationDevelopmentSettingsService>("ApplicationDevelopmentSettingsService").to(ApplicationDevelopmentSettingsService).inSingletonScope();

          bind<EditModeFeature>("EditModeFeature").to(EditModeFeature).inSingletonScope();
        }
    )
    container.load(module);
}


}
