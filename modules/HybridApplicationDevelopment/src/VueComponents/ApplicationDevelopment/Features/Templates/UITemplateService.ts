import {  BusinessObject, DataAdapterOptions, IDataAdapter, IHTTPClientService, IPageConfiguration, IViewConfiguration } from "alphautils";
import { APITypes } from "alphautils";
import { TemplateDto } from "./TemplateDto";
import { interfaces } from "inversify";
import { UITemplateTypes } from "./UITemplateTypes";
import { FocussedViewContextService } from "src/utils/Services/Designer/FocussedViewContextService";
export class UITemplateService{

    private dataAdapter: IDataAdapter
    private httpService: IHTTPClientService
    private focussedService: FocussedViewContextService
    constructor(c: interfaces.Newable<IDataAdapter>, httpService?: IHTTPClientService, focussedService: FocussedViewContextService){
        this.httpService = httpService
        this.focussedService = focussedService
        if(this.dataAdapter == undefined){
            
            const adapter = new c(new DataAdapterOptions({
                boType: new BusinessObject({
                    name: 'UIViewTemplate',
                    propertys: [],
                }),
                persistLocalStorage: true,
                persistGlobalStorage: false,
                apiDefinition:{
                    url: 'UiApplicationManagement/viewtemplate',
                    type: APITypes.REST,
                    networkname: 'WebCreatorBackend'
                },
                contextId: 0
            }), 0, undefined)
           this.dataAdapter = adapter
        }
    }
    public CreateNewViewTemplate(template: TemplateDto){

        if(template.name == undefined || template.name == ''){
            throw new Error('Template name is required')
        }

        if(template.type == undefined || template.type == ''){
            template.type = UITemplateTypes.ViewTemplate
        }


        var result = this.httpService.sendRequest({
            networkname: 'WebCreatorBackend',
            method: 'POST',
            url: 'UiApplicationManagement/viewtemplate',
            data: template
        })
        this.dataAdapter.Create(template)
    }

    public async GetPublicTemplates(): Array<TemplateDto>{
        const templates = await this.httpService.sendRequest<Array<TemplateDto>>({
            url: 'api/UiApplicationManagement/viewtemplate/allPublic',
            method: 'GET',
            networkname: 'WebCreatorBackend'
        })

        return templates.data
    }

    public CreateTemplateValueString(value: IPageConfiguration | IViewConfiguration){

        

        //backend creates this with guid
        delete value.parentId
        
        
        return JSON.stringify(this.PrepareViewTemplate(value))
    }

    private PrepareViewTemplate(view: IViewConfiguration){
        
        let children = [];
        if(view.children?.filter(c => c.type == 'childrenCollection').length > 0){
            for(const childId of view.children.find(c => c.type == 'childrenCollection').value){
                const child = this.focussedService.GetAll().find(v => v.id == childId)
                children.push(this.PrepareViewTemplate(JSON.parse(JSON.stringify(child))))

            }
            view.children = children
        }

        return view
    }


}