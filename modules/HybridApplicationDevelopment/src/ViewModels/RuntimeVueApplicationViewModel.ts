//@ts-ignore
//@ts-nocheck
import {   ref, ComponentInternalInstance, Ref, computed, provide, inject, reactive} from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ApplicationDeploymentModes, IApplicationConfiguration, useWebNodeStore, IDataAdapter, 
    ApplicationConfiguration, waitForElm,  useModellingStore, IViewElement, IViewConfiguration, IApplication, Screen, ApplicationFactory, VueApplication, SimpleNameValueCollection, IPageConfiguration, KeyValuePair, 
    DataContextManager} from 'alphautils';

//import { ApplicationServices } from '../Services/ApplicationServices';
import { ViewConfigurationService } from '../Services/ViewConfigurationService';
import { FocussedViewContextService } from '../Services/Designer/FocussedViewContextService';
import { ApplicationService } from '../Services/Development/ApplicationService';
import { BaseServiceProvider } from 'alphautils';
import { StyleManagerViewModel } from './StyleManagerViewModel';
import BackgroundFacadeComponent from '../VueComponents/ApplicationDevelopment/BackgroundFacadeComponent.vue';
import { set, get } from "lodash-es";
import { useRouter } from 'vue-router';
import { DefaultRuntimeApplicationStartup } from '../utils/Application/Startups/DefaultRuntimeApplicationStartup';
import { ApplicationPageViewModel } from './ApplicationPageViewModel';
import { interfaces } from 'inversify';

import { StyleService } from '../utils/Services/Designer/StyleService';
import { PageService } from '../utils/Services/Development/PageService';
import { getActivePinia } from 'pinia';
import { InternationalizationViewModel } from '../utils/Features/Internationalization/InternationalizationViewModel';
import { ApplicationDevelopmentSettingsService } from '../VueComponents/ApplicationDevelopment/ApplicationSettings/ApplicationDevelopmentSettingsService';
import {VueI18n } from 'vue-i18n';
import { IRepository } from 'alphautils/src/Data/Repositorys/IRepository';
import { IStateHistoryCommands } from 'alphautils/src/Data/StateManagement/StateHistory/IStateHistoryCommands';
import { NodeViewModel } from './NodeViewModel';
import { WebContainerService } from '../utils/Features/Deployment/WebContainerService';
import { NodeApplicationServerModel } from '../Models/NodeApplicationServerModel';
import { ApplicationModel } from '../Models/ApplicationModel';
import { PageModel } from '../Models/PageModel';
import { NodeApplicationServerService } from '../utils/Services/Development/Runtime/NodeApplicationServerService';
import { VersionManager } from 'localversioncontrol';
import { ApplicationVersionManager } from '../utils/Features/VersionManagement/ApplicationVersionManager';
import { ContextLevel } from 'alphautils/src/Data/StateManagement/ContextLevel';
export class RunTimeVueApplicationViewModel{
    
    private vueApp: ComponentInternalInstance
    public sessioncontextid = 0;

    public isReady: Ref<boolean> = ref(false);
    FocussedViewService: FocussedViewContextService
    private service: ApplicationService;
    private serviceProvider: BaseServiceProvider;
    public viewService: ViewConfigurationService

    styleManager: StyleManagerViewModel
    private facadeRef: typeof BackgroundFacadeComponent
    private factory: ApplicationFactory
    public currentPage: Ref<number>;
    private pageViewModels: Array<ApplicationPageViewModel> = [];
    private pagesContextRef: Ref<Array<number>> = ref([]);
    styleService: StyleService
    private dataAdapterConstructor: interfaces.Newable<IDataAdapter>
    public settingsService: ApplicationDevelopmentSettingsService
    public _codeViewModel: NodeViewModel
    public repository: IRepository
    public languageViewModel: InternationalizationViewModel
    public model: ApplicationModel;
    private contextManager: DataContextManager
    private serverService: NodeApplicationServerService
    customCss: Ref<string> = ref('');

    focusIsFixed = false;
    currentRoute: RouteRecordRaw

    focussedViews: Ref<Array<number>> = ref([]);
    hoveredView: Ref<IViewConfiguration | undefined> = ref(undefined);
    disableHover: Ref<boolean> = ref(false);

    dataAdapter: IDataAdapter

    versionManager: ApplicationVersionManager

    constructor(
        appId: string,
        config: IApplicationConfiguration,
        facadeRef: typeof BackgroundFacadeComponent,
        i18n: VueI18n,
        mountId: string,
        instance

        ){
        this.vueApp = instance;
        this.contextManager = BaseServiceProvider.ServiceWithContext<DataContextManager>('DataContextManager', 0);
        this.currentPage = ref();        
        this.pagesContextRef = ref([])

            
            

        this.FocussedViewService = BaseServiceProvider.ServiceWithContext<FocussedViewContextService>('FocussedViewContextService', 0);
        this.facadeRef = facadeRef;
        this.service = BaseServiceProvider.ServiceWithContext<ApplicationService>('ApplicationService', 0) as ApplicationService;
        this.viewService =  BaseServiceProvider.ServiceWithContext<ViewConfigurationService>('ViewConfigurationService', 0);
        

        config.contextid = this.contextManager.NewContext(undefined, ContextLevel.Application).contextid;
        this.model = new reactive(new ApplicationModel(config));
        this.sessioncontextid = this.model.contextid;
this.serviceProvider = new BaseServiceProvider(this.sessioncontextid)
        this.InitializeApplicationContext(this.model)        
        
        this.init(i18n)

    }
    public init(i18n){
        
            this.WatchForScreenChanges();

            this.styleManager = new StyleManagerViewModel();
            
            this.dataAdapterConstructor = BaseServiceProvider.ServiceWithContext<interfaces.Newable<IDataAdapter>>('DataAdapterConstructor', 0);
            this.dataAdapter = new this.dataAdapterConstructor({
                apiDefinition: {
                    networkname: "WebCreatorBackend"
                },
                boType: new ApplicationConfiguration(),
                persistLocalStorage: false,
                contextId: 0,
            }, 0, inject('iotcontainer_0',undefined) as Container);


            


            this.repository = this.UseService<IRepository>('BORepository');
            this.repository.CreateHistory(
                this.sessioncontextid,
                [
                    {boName: 'ViewConfiguration',
                    create: (value, addToHistory) => this.AddRawViewElement(value, false, addToHistory),
                    delete: (id, contextid, addToHistory) => this.DeleteElement(id, contextid, false, addToHistory),
                    update: (id, value, oldValue, addToHistory) => this.UpdateView(id, value, oldValue, false, addToHistory),
                    updatePartial: (id, value, oldValues, addToHistory) => this.PartialUpdateView(id, value, oldValues, false, addToHistory)
                    } as IStateHistoryCommands,
                    {
                        boName: 'Page',
                        create: (value, addToHistory) => this.AddPage(value, false, addToHistory),
                        delete: (id, contextid, addToHistory) => this.DeletePage(id, contextid, false, addToHistory),
                        update: (id, value, oldValue, addToHistory) => this.UpdatePage(id, value, oldValue, false, addToHistory),
                        updatePartial: (id, value, oldValues, addToHistory) => this.PartialUpdatePage(id, value, oldValues, false, addToHistory)
                    }
                ]    
            );
        //this.versionManager = new ApplicationVersionManager(config.remoteRepository)
        //this.versionManager.SyncRepository(this.model)


        this.styleService = this.UseService<StyleService>('StyleService');
        this.settingsService = BaseServiceProvider.ServiceWithContext<ApplicationDevelopmentSettingsService>('ApplicationDevelopmentSettingsService', 0) as ApplicationDevelopmentSettingsService;
        provide('styleManager_' + this.sessioncontextid, this.styleManager)
        provide('applicationViewModel', this)
        provide('devMode', this.settingsService.store.devSettings.developmentMode)
        this.InitInternationalization(i18n);
    }
    public InitInternationalization(i18n){
        const vM = new InternationalizationViewModel(i18n, this.model);
        this.languageViewModel = vM;
        if(this.model.internationalization != undefined){
            if(this.model.internationalization.locales != undefined){
                for(const locale of this.model.internationalization.locales){
                    vM.AddLanguageFileString(locale);
                }
            }
        }

        this.app.rootApp.provide('languageVM_' + this.model.contextid, vM);
  
    }
    public SaveChanges(){
        /*
        this.repository.CommitHistory()
        this.PrepareConfiguration();
        */
        const config = this.GetConfiguration()
        try{
            this.dataAdapter.IsolatedRequest('/applications?id='+config._id, 'PATCH', config);
        }catch(e){
            console.error("Error while saving changes", e);
        }finally{
            this.repository.setHistoryIsSavedPermanently(this.sessioncontextid);
        }
        
    }
    public NavigateToPage(name: string){
        const page = this.pageViewModels.find(p => p.model.name == name);
        if(page == undefined){
            throw Error('Page not found')
        }
        if(this.currentPage?.value == page.contextid){
            return;
        }

        this.currentPage.value = page.contextid;
    }
    private AddViewToPage(view: IViewConfiguration, commitHistory = true, addToHistory = true){
        const page = this.pageViewModels.find(p => p.contextid == this.currentPage.value);
        if(view.properties?.isActive == false){
            view.properties.isActive = true;
        }
        return page.AddView(view, commitHistory, addToHistory);
    }
    AddRawViewElement(view: IViewConfiguration, commitHistory = true, addToHistory = true){
        if(view?.properties?.isActive == false){
            view.properties.isActive = true;
        }
        view.contextid = this.currentPage.value;
        view.publicidentifier = this.createPublicIdentifier(view);
        const newNode = this.AddViewToPage(view, false, addToHistory);
        this.AddNodeToParentChildren(newNode, false, addToHistory);
        if(commitHistory){
             this.repository.CommitHistory()
        }

        const ele = document.getElementById("mountpointWrapper") as HTMLIFrameElement;
        //ele.contentWindow.postMessage({type: 'bo.create', action: 'create', value: JSON.parse(JSON.stringify(newNode))}, '*')
         
        //ele.contentDocument.postMessage({type: 'bo.create', action: 'create', value: JSON.parse(JSON.stringify(newNode))}, '*')
             return [true, newNode];
    }
    public GetChildren(id: number){
        const view = this.GetViews().find(c => c.id == id);
        const children = view?.children?.find(c => c.type == 'childrenCollection');
        if(children == undefined){
            return [];
        }
        return this.GetViews().filter(c => children.value.includes(c.id));
    }
    public createElement(type: string, values?){
        const result =  this.viewService.Create(type, values, undefined, this.settingsService.store.devSettings.useViewTemplates, this.model.name, false, this.GetViews());
        return result;
    }
    addViewElement(type: string,  parentid: number, node: IViewConfiguration, useFactory: boolean = true){

        if(useFactory){
            node = this.viewService.Create(type, node, parentid, this.settingsService.store.devSettings.useViewTemplates, this.model.name, undefined, this.GetViews());
        }
        if(Array.isArray(node)){
            for(const n in node){
                this.AddRawViewElement(n);
            }
            const topNode = node.reduce((prev, curr) => prev.parentId < curr.parentId ? prev : curr);
            setTimeout(() =>this.focusView(topNode.id, true),100 )
        }else{
            if(parentid == undefined){
                return undefined
            }
            this.AddRawViewElement(node);
            this.AddNodeToParentChildren(node);
            this.focusView(node.id, true);
        }
    }   

    tryFocus(e: MouseEvent, fixed = false){
       
        let potentialElement;
        if(fixed == true){
            if(e.target?.id == 'focussed-helper'){
            }
            if(e.target.dataset.element != undefined){
                
                return this.focusView(parseInt(e.target.dataset.element.replace('element_', '')), true);
            }
            else if(e.target.parentElement?.dataset.element != undefined){
                return this.focusView(parseInt(e.target.parentElement.dataset.element.replace('element_', '')), true);
            }else{

                potentialElement = e.target?.querySelector('[data-element]');
                if(potentialElement != undefined){
                    return this.focusView(parseInt(potentialElement.dataset.element.replace('element_', '')), true);
                }

                potentialElement = e.target?.closest('[data-element]');
                if(potentialElement != undefined){
                    return this.focusView(parseInt(potentialElement.dataset.element.replace('element_', '')), true);
                }
            }
        }else{
            this.hoverView(e);
        }
    } 
    public hoverViewSafe(id: number){
        const el = document.querySelector('[data-element="element_' + id + '"]');
      
        if(el == undefined){
            return;
        }
        el.classList.add('focussed-element');
        
        const oldHoverdElement = document.getElementsByClassName('focussed-element');
                for(let i = 0; i < oldHoverdElement.length; i++){
                    if( parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) != this.focussedViews.value[0]
                        && parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) != id){
                        oldHoverdElement[i].classList.remove('focussed-element');
                    }
                }
                const view = this.GetViews().find(c => c.id == id);
                
                
                this.hoveredView.value = view;
                this.FocussedViewService.hoveredView.value = view;

    }
    public hoverView(e: MouseEvent){
        const hover = this.disableHover
        if(hover.value != true){

            let potentialElement = this.FindNearestView(e);
            if(potentialElement != undefined){
                if(!potentialElement?.classList?.contains('development-root-component') && potentialElement != undefined && potentialElement.dataset.element != undefined){
                    const oldHoverdElement = document.getElementsByClassName('focussed-element');
                    for(let i = 0; i < oldHoverdElement.length; i++){
                        if( parseInt(oldHoverdElement[i].getAttribute('data-element')?.replace('element_', '')) 
                        != this.focussedViews.value[0]){
                            oldHoverdElement[i].classList.remove('focussed-element');
                        }
                    }
                    const el = this.GetViews().find(c => c.id == parseInt(potentialElement.dataset.element.replace('element_', '')));
                    potentialElement = potentialElement.classList.add('focussed-element');

                    
                    this.hoveredView.value = el;
                    this.FocussedViewService.hoveredView.value = el;
                }   
            }
        }
    }
    public GetViews(){
        const page = this.pageViewModels.find(p => p.contextid == this.currentPage.value);
        if(page == undefined){
            return [];
        }
        
        return page?.model.views;
    }
    public UpdateFocusedElement(values){
        if(values == undefined){
            return;
        }

        const view = this.GetFocussedElement().value;
        if(view == undefined){
            return;
        }
        const page = this.pageViewModels.find(p => p.contextid == this.currentPage.value);
        
            let oldValues = new SimpleNameValueCollection()
            for(const keyValue of values){
                oldValues.keyValuePairs.push({key: keyValue.key, value: get(view, keyValue.key, [undefined])})
            }
        page.PartialUpdateView(view.id, {keyValuePairs:values}, oldValues, true);
    }
    public UpdateView(id: number, view: IViewConfiguration, oldValue: IViewConfiguration = undefined, commitHistory = true, addToHistory = true){
        const page = this.pageViewModels.find(p => p.contextid == this.currentPage.value);
        return page.UpdateView(id, view, oldValue, commitHistory, addToHistory);
    }
    public PartialUpdateView(id, values: SimpleNameValueCollection, oldValues: SimpleNameValueCollection, commitHistory = true, addToHistory = true){
        const page = this.pageViewModels.find(p => p.contextid == this.currentPage.value);
        const view = this.GetViews().find(c => c.id == id);

        if(oldValues == undefined){
            oldValues = new SimpleNameValueCollection()
            for(const keyValue of values.keyValuePairs){
                oldValues.keyValuePairs.push({key: keyValue.key, value: get(view, keyValue.key, [undefined])})
            }
        }
        return page.PartialUpdateView(id, values, oldValues, commitHistory, addToHistory);
    }
    /* #region private Hilfsmethoden */
    private PrepareConfiguration(){
        this.model.pages = [];
    
        for(const pageVM of this.pageViewModels){
            pageVM.PreparePageConfig();
            this.model.pages.push(pageVM.model)    
        }

        this.languageViewModel.PrepareConfig(this.model)
    }
    public GetConfiguration(){
        this.PrepareConfiguration();
        return this.model;
    }
    public GetFocussedElement(){
        return computed(() => {
            return this.GetViews().find(c => c?.id == this.focussedViews.value[0])
        })
    }
    public GetRootView(contextid: number): IViewConfiguration{
        if(contextid == undefined){
            contextid = this.currentPage.value
        }
        return computed(() => {
            const page = this.pageViewModels.find(p => p.contextid == contextid);
            return page.model.views.find(v => v?.isRoot == true);
        }).value
    }


    private WatchForScreenChanges(){
        const screen = this.serviceProvider.GetService<Screen>('Screen');
        
        
        const callback = (width: number, height: number) => this.HandleScreenChanges(width, height);
        screen.Subscribe(callback)
    }
    private HandleScreenChanges(width: string, height: string){
        if(this.facadeRef.value == undefined){
            throw new Error('Facade is undefined')
        }

        this.facadeRef.value.ChangeFacadeStyle({width: width, height: height});
    }
    private InitializePages(pages: Array<IPageConfiguration>){
        for(const page of pages){
            const pageViewModel = new ApplicationPageViewModel(page, this.UseService<interfaces.Newable<IDataAdapter>>('DataAdapterConstructor'), this.viewService, this.app.container, false, false);
            this.pagesContextRef.value.push(pageViewModel.contextid);
            this.pageViewModels.push(pageViewModel);
        }
    }

    private InitializeApplicationContext(config: IApplicationConfiguration){
        const app = this.CreateShadowApplication(config);
        this.app = app
        
        this.InitializePages(config.pages)
        
        const landingPage = this.GetPageEntitys().value.find(p => p.role == 'Landingpage');
        if(landingPage == undefined){
            throw new Error('No landing page found')
        }
        this.customCss.value = this.model.stylesheets?.css ?? ''
        this.NavigateToPage(landingPage.name);

        this.isReady.value = true

    }
    public GetPageEntitys(){
        return computed(() => {
            return this.pagesContextRef.value.map(p => {return this.pageViewModels.find(c => c.contextid == p)?.model})
        })
    }
    public GetPages(){
        return computed(() => {
            return this.pagesContextRef.value;
        })
    }
    public GetPageViews(pagecontext: number){
        return computed(() => {
            const page = this.pageViewModels.find(p => p.contextid == pagecontext);
            return page?.model.views;
        })
    }
    private InitializeSpaClient(config: IApplicationConfiguration){
        this.InitializePages(config.pages)
    }
    public RemoveNodeFromParentChildren(node: IViewConfiguration, addToHistory = true){
        const parent = this.GetViews().find(c => c?.id == node?.parentId);
        if(parent == undefined){
            return;
        }
        const collection = parent.children?.find(c => c.type == 'childrenCollection');
        if(collection == undefined){
            return;
        }
        const i = collection.value.indexOf(node.id);
        if(i == -1){
            return;
        }
        let oldValues = new SimpleNameValueCollection()
        
        //if(parent.children == undefined || collection.value?.includes(node.id) == false){
         //   console.log("XXX")
            oldValues.keyValuePairs.push({key: 'children', value: [{type: 'childrenCollection', value: [node.id]}]})
        //}

        collection.value.splice(collection.value.indexOf(node.id), 1);
        this.UpdateView(parent.id, parent, oldValues, false, addToHistory);
    }

    public DeactivateView(id: number){
        const view = this.GetViews().find(c => c.id == id);
        if(view == undefined){
            return;
        }
        if(view.properties == undefined){
            view.properties = {};
        }
        view.properties.isActive = false;
        this.UpdateView(id, view);
    }
    public ActivateView(id: number){
        const view = this.GetViews().find(c => c.id == id);
        if(view == undefined){
            return;
        }
        view.isActive = true;
        this.UpdateView(id, view);
    }
    public AddNodeToParentChildren(newNode: IViewConfiguration | Array<IViewConfiguration>, commitHIstory = false, addToHistory = true){
        
        if(!Array.isArray(newNode)){
            newNode = [newNode];
        }
        for(const node of newNode){
            // the new node is a root node
            if(this.GetViews().find(c => c?.id == node?.parentId) != undefined){
                
                const parent = this.GetViews().find(c => c.id == node.parentId);
                const oldValues = {
                        keyValuePairs: [
                            {
                            key:'children', value: parent?.children ?? [
                                {
                                    type: 'childrenCollection', 
                                    value: []
                                }
                            ]
                 }]}; ;
                let collection = parent?.children?.find(c => c?.type == 'childrenCollection');
                if(collection == undefined){
                    collection = {
                        type: 'childrenCollection',
                        value: []
                    }
                }
                
                else{
                    JSON.parse(JSON.stringify(collection));
                }
                if(collection.value.includes(node.id)){
                    return;
                }
                
                collection.value.push(node.id);
                //this.UpdateView(newNode.id, node);
                this.PartialUpdateView(parent?.id, new SimpleNameValueCollection([{key: 'children', value: [collection]}]), oldValues, commitHIstory, addToHistory);

            }
        }

        
    }
    public FindNearestView(e: MouseEvent){
        const target = document.elementFromPoint(e.clientX, e.clientY)
        if(target == undefined || target == null){
            return undefined;
        }
        const elem = target.closest('[data-element]');
        return elem;
    }
    public unfocusAll(){
        this.focussedViews.value = [];
        const el = document.getElementsByClassName('focussed-element');
        for(let i = 0; i < el.length; i++){
            el[i].classList.remove('focussed-element');
        }
        this.FocussedViewService.SetFocussedView(undefined);
    }
    public focusView(id?: number, refocus = false){
            if(id == undefined && refocus == true){
                this.focussedViews.value  = [];
            }
            if(this.focussedViews.value.length == 1 && this.focussedViews.value[0] == id){
                return;
            }

            if(this.focussedViews.value.length > 0 && refocus == true){
                for(const id of this.focussedViews.value){
                    const el = document.querySelector('[data-element="element_' + id + '"]');
                    el?.classList.remove('focussed-element');
                }
                this.focussedViews.value = [id];
            }else{
                this.focussedViews.value.push(id);
            }
            waitForElm('[data-element="element_' + id + '"]').then((elm) => {
                if(!elm.classList.contains('focussed-element')){
                    elm.classList.add('focussed-element');
                }
            })  

            if(this.FocussedViewService.contextid != this.currentPage.value){
                const deleteHandler  = (id: number) => this.DeleteElement(id);
                const updateHandler = (id: number, view: IViewConfiguration) => this.updateElement(id, view);
                this.FocussedViewService.SetDeleteHandler(this.model.contextid, deleteHandler);
                this.FocussedViewService.SetUpdateHandler(this.model.contextid, updateHandler);
                this.FocussedViewService.SetFocussedView(this.GetViews().find(c => c.id == id));
                this.FocussedViewService.SetGetter(() => this.GetViews());
            }else{
                this.FocussedViewService.SetFocussedView(this.GetViews().find(c => c.id == id));
            }
           
    }
    private CreateShadowApplication(config: IApplicationConfiguration): IApplication{
        this.factory = BaseServiceProvider.Service<ApplicationFactory>('ApplicationFactory') as ApplicationFactory;

        const vueApp = this.vueApp.appContext.app;
        const router = useRouter();
        
        const startup = new DefaultRuntimeApplicationStartup();
        const pinia = getActivePinia()
        const app =  new VueApplication(config, undefined, vueApp, router, undefined, pinia)
                        .setup()
                        .useStartup(startup)
                        .build()
        return app;
    }
    public DeleteElement(id: number, commitHistory = true, addToHistory = true){ 
        const element = this.GetViews().find(c => c.id == id);
        if(element.tag.includes("DefaultRootComponent")){
            return;
        }
        const page = this.pageViewModels.find(p => p.model.views.find(v => v.id == id) != undefined);
        const node = this.GetViews().find(c => c.id == id); 
        this.RemoveNodeFromParentChildren(node, addToHistory)
        page.DeleteView(id, commitHistory, addToHistory);
        return [true]
    }
      
    private createPublicIdentifier(view: IViewElement): string{
        //todo remove this logic?? duplicate with in viewconfigurationservice
        return 'element_' + view.id;
    }
    public DeletePage(id: number, commitHistory = true, addToHistory = true){
        const page = this.pageViewModels.find(p => p.model.id == id);
        if(page == undefined){
            return;
        }
        this.pagesContextRef.value.splice(this.pagesContextRef.value.indexOf(page.contextid), 1);
        page.DeletePage(commitHistory, addToHistory);
        const i = this.pageViewModels.indexOf(page);
        this.pageViewModels.splice(i, 1);
        this.currentPage.value = -1;

        return [true]
    }
    public UpdatePage(id: number, values: Array<KeyValuePair>, commitHistory = true, addToHistory = true){
        const page = this.pageViewModels.find(p => p.model.id == id);
        page.UpdatePage(values, commitHistory, addToHistory);

        return [true]
    }
    public AddPage(config?: IPageConfiguration, commitHistory = true, addToHistory = true){
        const page = PageService.CreatePageConfig(config);
        const vM = new ApplicationPageViewModel(page, this.dataAdapterConstructor, this.viewService, this.app.container, addToHistory, commitHistory);
        this.pageViewModels.push(vM);
        this.pagesContextRef.value.push(vM.contextid);

        return [true]
  
    }
    private UseService<T>(name: string): T{
        return BaseServiceProvider.ServiceWithAppContext<T>(name, this.sessioncontextid)?.service;
    }
    /* #endregion */
    
}