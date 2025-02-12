//@ts-nocheck
import { App, createApp, defineComponent, inject } from 'vue';
import { Router, createRouter, RouterOptions, RouteRecordRaw, createWebHistory } from 'vue-router';
import { waitForElm } from '../composables/useWaitforElement.js';
import { Quasar } from 'quasar';
import { Container} from 'inversify';
import { BODeclarationContainer } from '../Container/BODeclarationContainer.js';
import { BusinessObject } from '../Data/BusinessObject.js';
import { useApplicationStore } from '../stores/useApplicationStore.js';
import { ApplicationModes } from './ApplicationModes.js';
import { IApplicationModule } from './IApplicationModule.js';
import { IApplication } from './IApplication.js';
import { IStartup } from './IStartup.js';
import { ApplicationSettings } from './ApplicationSettings.js';
import { IApplicationConfiguration } from './IApplicationConfiguration.js';
import { DataContextManager } from '../Data/StateManagement/DataContextManager.js';
import { DefaultApplicationServiceCollection } from './ServiceCollections/DefaultApplicationServiceCollection.js';
import { IExternalNetworkConfiguration } from '../HTTP/IExternalNetworkConfiguration.js';
import { HTTPClientService } from '../HTTP/HTTPClientService.js';
import { ContextLevel } from '../Data/StateManagement/ContextLevel.js';
import { Pinia } from 'pinia';
import { IViewConfiguration } from '../View/IViewConfiguration.js';
import { IPageConfiguration } from '../View/IPageConfiguration.js';
import { ApplicationDeploymentModes } from './ApplicationDeploymentModes.js';
import { IHTTPClientService } from '../HTTP/IHTTPClientService.js';
import { Screen } from '../Models/Device/Screen.js';


export class VueApplication implements IApplication{

    private rootApp?: App
    private config: IApplicationConfiguration
    private vueRouter: Router
    private factory?: IApplicationComponentFactory
    private boDeclarations: Array<BusinessObject>
    private settings: ApplicationSettings
    private container: Container
    private startups: Array<IStartup> = []
    private pinia: Pinia
    private  resolver: {resolveComponent: (view: IViewConfiguration) => Promise}

    public screen: Screen

    constructor(
        config: IApplicationConfiguration,
        factory?: undefined, // todo delete this
        app?: App,
        router?: Router,
        settings?: ApplicationSettings,
        pinia?: Pinia,
        resolver: {resolveComponent: (view: IViewConfiguration) => Promise}){
   
        this.config = config;
        this.factory = factory;
        this.settings = settings;
        this.pinia = pinia
        this.resolver = resolver
        this.vueRouter = router
        if(app != undefined){
            this.rootApp = app;
        }
       
        if(this.config.deploymentMode == ApplicationDeploymentModes.spaclient){
            
            if(router != undefined){
                this.vueRouter = router;
            this.SetupRoutes(this.config.pages)
            }            
            
        }
        if(this.pinia == undefined){
            throw new Error('Pinia not found')
        }
    }
    private RegisterModule(module: IApplicationModule){
        if(module.middleware != null && module.middleware != undefined && module.middleware.length > 0){
            for(const middleware of module.middleware){
                this.AddMiddleware(middleware)
            }
        }
        if(module.networkConfigs != null && module.networkConfigs != undefined && module.networkConfigs.length > 0){
            
            if(this.config.networkConfigs == null || this.config.networkConfigs == undefined){
                //this.config.networkConfigs = new Array<IExternalNetworkConfiguration>()
            }
            
            for(const networkConfig of module.networkConfigs){

                this.config.networkConfigs.push(networkConfig)
            }
        }
      
        if(typeof module.InitializeServices == 'function'){       
            module.InitializeServices(this.container, this.config)
        }
        
        if(typeof module.register == 'function'){ 
            module.register(this, this.pinia)
        }
        
    }

    private AddMiddleware(middleware: object){
        middleware.register(this.vueRouter)
    }
    public AddBODeclarations(declarations: Array<BusinessObject>){
        this.boDeclarations = declarations
        const container = new BODeclarationContainer()
        container.AddBOTypes(declarations)
        useApplicationStore(this.pinia).boDeclarations = container;
        return this;
    }
    private CreateDIContainer(): VueApplication{

        let parentcontainer;

        if(this.config.mode == ApplicationModes.shadow){
            parentcontainer = inject('iotcontainer_0') as Container
        }

        if(parentcontainer != undefined){
            this.container = parentcontainer.createChild()
            return this;
        }else{
            this.container = new Container() as Container
        }
        
        this.container.bind<IApplicationComponentFactory>('ApplicationComponentFactory').toConstantValue(this.factory)
        const boContainer = new BODeclarationContainer();
        boContainer.AddBOTypes(this.boDeclarations)
        this.container.bind<BODeclarationContainer>('BODeclarationContainer').toConstantValue(boContainer)
        this.container.bind<ApplicationSettings>('ApplicationSettings').toConstantValue(this.settings)
        
        return this;
    }
    public setup(): VueApplication{

        this.CreateDIContainer()
        
        if(this.config.modules != null && this.config.modules != undefined && this.config.modules.length > 0){
            for(const module of this.config.modules){
                this.RegisterModule(module)
            }
        }

        const defaultServiceCollection = new DefaultApplicationServiceCollection()
        defaultServiceCollection.InitializeServices(this.container, this.config, this.pinia)
        

        if(this.config.mode == ApplicationModes.standalone){
            this.setupStandalone();
        }

        if(this.config.middleware != null && this.config.middleware != undefined && this.config.middleware.length > 0){
            for(const middleware of this.config.middleware){
                this.AddMiddleware(middleware)
            }
        }
        return this;
    }
    
    public useStartup(startup: IStartup): VueApplication{
        
        this.startups.push(startup)

        return this;
    }
    public SetupRoutes(pages: Array<IPageConfiguration>){
        const routes = new Array<RouteRecordRaw>();
        for(const page of pages){
            for(const view of page.views.filter(v => v.isRoutable == true)){
                
                routes.push(this.CreateRoute(view))
            }
        }

        for(const route of routes){
            this.vueRouter.addRoute(route)
        }
        return routes;
    }
    public addRoute(route: RouteRecordRaw){
        this.vueRouter.addRoute(route)
    }

    private CreateRoute(component: IPageConfiguration | IViewConfiguration): RouteRecordRaw{
        return {
            path: component.route.path,
            component: this.resolver.resolveComponent(component),
            name: component.route.name,
            children: component.views?.filter(v => v?.isRouteable == true)?.map(child => this.CreateRoute(child))
        } as RouteRecordRaw
    }
    public mount(){
        if(this.config.mode != ApplicationModes.standalone){
            return this;
        }
        waitForElm(this.config.selector).then(() =>  {
            this.rootApp?.mount(this.config.selector);
        })
        return this;
    }

    private setupStandalone(){
   


        const newApp = createApp(ApplicationRootComponent)
        //Quasar.install(newApp, {})
        
        Quasar.install(newApp, {})

        
        newApp.use(this.vueRouter)
        this.rootApp = newApp;
        
    }
    public build(): VueApplication{
        const contextManager = this.container.get<DataContextManager>('DataContextManager')
        if(contextManager == undefined){
            throw new Error('DataContextManager not found')
        }

        const rootManager = this.container?.parent?.get<DataContextManager>('DataContextManager')
        let rootContext;
        
        if(this.config.mode == 'shadow'){
            
            rootContext = contextManager.UpgradeContextLevel(this.config.contextid, ContextLevel.Application, rootManager).contextid
            contextManager.hasParentManager = true
        }else{
            rootContext = contextManager.NewContext(undefined, ContextLevel.Application).contextid
        }
        
        this.container.bind<VueApplication>('VueApplication').toConstantValue(this)
        this.rootApp.provide('iotcontainer_'+ rootContext, this.container)

        const httpService = this.container.get<IHTTPClientService>('HTTPClientService') as HTTPClientService        

        if(this.config?.networkConfigs != undefined){
            for(const networkConfig of this.config?.networkConfigs){
                httpService.networks.push(networkConfig)
            }
        }
        if(this.startups != undefined){
            for(const startup of this.startups){
                startup.InitializeServices(this.container, this.config, this.store)
            }
        }

        this.BindServicesToApp();

        this.rootApp.provide('app_' + rootContext)
        return this
    }

    private BindServicesToApp(){
        //todo for what needed?
        this.screen = this.container.get<Screen>('Screen', undefined)
    }
}