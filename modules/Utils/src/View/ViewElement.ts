//@ts-nocheck   
import { IEventInvoker } from '../ClientActions/EventHandler/IEventInvoker.ts';
import { BaseView } from './BaseView.ts';
import { IViewElement } from './IViewElement.ts';
import { ViewConfiguration } from './ViewConfiguration.ts';
import { MaybeRefOrGetter, toValue, watch } from 'vue';
import { IUIEvent } from '../ClientActions/EventHandler/IUIEvent.ts';
import { IEventHandler } from '../ClientActions/EventHandler/IEventHandler.ts';
import { EventBus } from '../ClientActions/EventHandler/EventBus.ts';
import { UIActionFactory } from '../ClientActions/UIActionFactory.ts';
import { GlobalStateProvider } from '../Data/StateManagement/GlobalStateProvider.ts';
import { type IExecutionContextProvider } from '../CodeExecution/IExecutionContextProvider.ts';
import { ValueResolver } from '../CodeExecution/ValueResolver.ts';
import { IUIAction } from '../ClientActions/IUIAction.js';
import { ObjectValueResolver } from '../CodeExecution/ObjectValueResolver.js';
import { IViewConfiguration } from './IViewConfiguration.js';


export class ViewElement extends BaseView implements IViewElement, IEventHandler{

    private actionFactory: UIActionFactory
    private isRegisteredInGlobalScope: boolean = false;
    private viewContextProvider: IExecutionContextProvider;
    private eventBus: EventBus;
    private plobalStateProvider?: GlobalStateProvider

    public identifier: string;
    constructor(config: MaybeRefOrGetter<ViewConfiguration>) {
        super(config);
        this.actionFactory = this.GetService<UIActionFactory>('UIActionFactory');
        this.identifier = toValue(config.publicIdentifier)
  
    }

    public handleEvent(sender:IEventInvoker, event: IUIEvent){
        for(const action of event.actions){
            const actionInstance = this.GetOrCreateActionInstance(action);
      
            actionInstance.execute(action, sender);
        }
        
    }

    public bind(){
        const config = this.GetConfiguration();

        if(config == undefined){
            throw new Error('ViewElement configuration is undefined');
        }

        if(config.interaction == undefined ){
            return;
        }
        
        if(config?.interaction?.events != undefined){
            
            if(this.eventBus == undefined){
                this.eventBus = this.GetService<EventBus>('EventBus');
            }
            
            for(const event of config?.interaction?.events){
                this.eventBus.on(event, this);
            }
        }

       
    }
    
    public unbind(){
       
        const config = this.GetConfiguration();
        if(config == undefined){
            throw new Error('ViewElement configuration is undefined');
        }

        if(config.interaction == undefined ){
            return;
        }
        
        if(config.interaction.events == undefined){
            return;
        }

        if(this.eventBus == undefined){
            this.eventBus = this.GetService<EventBus>('EventBus');
        }

        for(const event of config.interaction.events){
            this.eventBus.off(event, this);
        }
    }
    public RegisterMethodsInGlobalScope(methods: Array<{methodName: string, function: () => void}>){
        const service = this.GetService<GlobalStateProvider>('GlobalStateProvider') as GlobalStateProvider;

        if(service == undefined){
            throw new Error('GlobalStateProvider service not found');
        }
        service.AddViewContext({
            viewId: this.GetConfiguration().publicIdentifier,
            localActions: methods
        })
        this.isRegisteredInGlobalScope = true;
    }
    
    public GetOrCreateActionInstance(config: IUIAction){
        //todo save instance on this for better performance
        if(this.actionFactory == undefined){
            this.actionFactory = this.GetService<UIActionFactory>('UIActionFactory');
        }
        console.log("actionconfig", config)
        return this.actionFactory.create(config);
    }

    public GetActions()
    {
        return this.GetConfiguration().interaction.actions;
    }

    public ProvideContext(): {contextProvider: IExecutionContextProvider, contextid: number}  {
        const provider = this.viewContextProvider;
        if(provider == undefined){
            this.viewContextProvider = this.GetService<IExecutionContextProvider>('ExecutionContextProvider');
        }
        return {contextProvider: this.viewContextProvider, contextid: this.GetConfiguration().contextid};
    }
    public ResolveTemplateProperty(propertyValue: string){
        if(this.viewContextProvider == undefined){
            this.viewContextProvider = this.GetService<IExecutionContextProvider>('ExecutionContextProvider');
        }
            return ValueResolver(this.viewContextProvider, this.GetConfiguration().contextid, propertyValue);
    }

    public ResolverObjectProperty(propertyValue: object){
        if(this.viewContextProvider == undefined){
            this.viewContextProvider = this.GetService<IExecutionContextProvider>('ExecutionContextProvider');
        }
        return ObjectValueResolver(this.viewContextProvider, this.GetConfiguration().contextid, propertyValue);
    }

    public GetChildrenIds(): Array<number> {
        return this.GetConfiguration().children[0]?.value;
    }
}
