//@ts-ignore
//@ts-nocheck
import { ViewConfigs as viewdefinitions}  from 'alphaviewlibrary'

import { IViewConfiguration } from 'alphautils';
import { ViewElementFactory } from '../ViewElementFactory';
import { inject, injectable } from 'inversify';
import { GridDesignerServive } from './Designer/GridDesignerService';
import { ViewTemplates as viewtemplates } from 'alphaviewlibrary'
import { ApplicationDevelopmentSettingsService } from '../../VueComponents/ApplicationDevelopment/ApplicationSettings/ApplicationDevelopmentSettingsService';

//this service is used to create view elements based on the viewdefinitions and viewtemplates ONLY during prodction
@injectable()
export class ViewConfigurationService{

    private factory: ViewElementFactory
    private gridDesignerService: GridDesignerServive
    private applicationDevelopmentSettingsService: ApplicationDevelopmentSettingsService

    constructor(
        @inject('ViewElementFactory') factory: ViewElementFactory,
        @inject('GridDesignerServive') gridDesignerService: GridDesignerServive,
        @inject('ApplicationDevelopmentSettingsService') applicationDevelopmentSettingsService: ApplicationDevelopmentSettingsService,
    ){
        this.gridDesignerService = gridDesignerService;
        this.factory = factory;
        this.applicationDevelopmentSettingsService = applicationDevelopmentSettingsService;
        this.factory.AddViewDefinitions(viewdefinitions.views);
        this.factory.AddTemplates(viewtemplates.views)
    }

    public static getAvaibleComponentTypes(): Array<string>{
        return viewdefinitions.views.map(v => v.type);
    }

    public Create(type: string, values: IViewConfiguration, parentId: number, useTemplateDeclarative, appName?: string, isProduction? = false, views?: Array<IViewConfiguration>): IViewConfiguration | Array<IViewConfiguration>{
        
      
      //todo exclude thos service from production environment
        let result: IViewConfiguration | Array<IViewConfiguration>;
      
        result = this.factory.Create(type, values, parentId, useTemplateDeclarative);
        
        if(isProduction == true){
            // prepare for production
        }else{
            for(const view of result){
                if(view.dataConfig != undefined){
                    view.dataConfig.appContextName = appName;
                }else{
                    view.dataConfig = {
                        appContextName: appName
                    }
                } 
                view.name = view.name + '_' + view.id;
                this.applicationDevelopmentSettingsService.OnNewElement(view);
            }
            this.ConfigureEvents(result, result);
        }
        return result;
    }


    private ConfigureEvents(views: Array<IViewConfiguration>, newviews: Array<IViewConfiguration>){
            //in viewtemplate, bindings between events, actions and viewElement are defined by the prop targetElement to the target with the prop templateIdentifier
            //these placeholder value are replaced by the actual publicIdentifier of the target element
            for(const view of views){
              if(view.interaction == undefined){
                continue;
              }
              if(Array.isArray(view?.interaction?.events)){
                for(const event of view?.interaction?.events){
                  if(event.targetElement != undefined){
                    const actualTargetPublicIdentifier = views.find(v => v.templateIdentifier == event.targetElement);
          
                    if(actualTargetPublicIdentifier == undefined){
                      throw new Error('targetElement not found');
                    }else if(actualTargetPublicIdentifier.publicidentifier == undefined){
                      throw new Error('targetElement publicIdentifier not found');
                    }
                    event.targetElement = actualTargetPublicIdentifier.publicidentifier;
          
                    if(event.actions == undefined){
                      continue;
                    }
          
                    for(const action of event.actions){
                      const actualTargetPublicIdentifier = views.find(v => v.templateIdentifier == action.targetElement);
          
                      if(actualTargetPublicIdentifier == undefined){
                        throw new Error('targetElement not found');
                      }
                      if(actualTargetPublicIdentifier.publicidentifier == undefined){
                        throw new Error('targetElement publicIdentifier not found');
                      }
                      action.targetElement = actualTargetPublicIdentifier.publicidentifier;
                    }
                  }
                }
              }
        
              for(const view of views){
                delete view.templateIdentifier;
              }
            }
            
    }
    
}