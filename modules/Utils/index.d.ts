import { UtilityModule } from "./src/UtilityModule";



import { DataSources } from "./src/Data/DataSources";
import { KeyValuePair } from "./src/Data/KeyValuePair";
import { SimpleNameValueCollection } from "./src/Data/SimpleNameValueCollection";
import { SolutionObject } from "./src/Data/SolutionObject";

import { AxiosWrapper } from "./src/HTTP/AxiosWrapper";
import { HTTPClientService } from "./src/HTTP/HTTPClientService";
import { IExternalNetworkConfiguration } from "./src/HTTP/IExternalNetworkConfiguration";
import { IHTTPClientService } from "./src/HTTP/IHTTPClientService";
import { IRequestConfig } from "./src/HTTP/IRequestConfig";

import { LoggingService } from "./src/Logging/LoggingService";
import { ValueValidationViewElement } from './src/View/ViewExtensions/ValueValidationViewElement.js';


import { AuthenticationMiddleware } from './src/Services/Auth/AuthenticationMiddleware.js';   


import { ITransactional } from "./src/Transaction/ITransactional";
import { ITransactionService } from "./src/Transaction/ITransactionService";
import { Transaction } from "./src/Transaction/Transaction";
import { TransactionService } from "./src/Transaction/TransactionService";
import { BaseView } from "./src/View/BaseView";

import { IBaseView } from "./src/View/IBaseView";
import { IHTMLAttributes, WebNodeContext, IBaseModellingButlerOptions } from "./src/View/interfaces";
import { IViewElement } from "./src/View/IViewElement";
import { ViewElement } from "./src/View/ViewElement";


import { BaseViewModel } from "./src/ViewModel/BaseViewModel.js";
import { IViewModel } from "./src/ViewModel/IViewModel";
import { IViewModelUsageOptions } from "./src/ViewModel/IViewModelUsageOptions";

import {StateUpdate, createElements, deleteElements, 
    updateElements,  updateValues, updateValue, updateElement, 
    deleteElement, createElement } from "./src/stores/storeUtils";

import { useApplicationStore } from "./src/stores/useApplicationStore";
import { useWebNodeStore } from "./src/stores/useWebNodeStore";
import { useCreatorStore } from "./src/stores/useCreatorStore";
import { useModellingStore } from "./src/stores/useModellingStore";
import { useWebNodeTemplateStore } from "./src/stores/useWebNodeTemplateStore";

import { useModellingStateManagementPlugin, ModellingContextStateManager,  CalledAndReverseAction, ActionsAndState, StateManagerOptions } from "./src/stores/Plugins/ModellingcontextStateManager";

import { IActionConfiguration } from "./src/ClientActions/IActionConfiguration";
import { IUIAction } from "./src/ClientActions/IUIAction";
import { UIAction } from "./src/ClientActions/UIAction";
import { UIActionFactory } from "./src/ClientActions/UIActionFactory";
import { UIActionTypes } from "./src/ClientActions/UIActionTypes";
import { IActionInput } from "./src/ClientActions/IActionInput";
import { EventBus } from './src/ClientActions/EventHandler/EventBus';


import { BaseServiceProvider } from './src/Services/Provider/BaseServiceProvider'

import { IService } from "./src/Services/IService";
import { IViewModelService } from "./src/Services/IViewModelService";



import { createUniqueClientIdInContext } from "./src/composables/createUniqueClientIdInContext";
import { deepcopy } from "./src/composables/deepcopy";

import { searchObjectInNestedArray } from "./src/composables/searchObjectInNestedArray";
import { waitForElm } from "./src/composables/useWaitforElement";

import { TabService } from "./src/Services/TabService";
import { useSolutionService } from "./src/Services/SolutionService";
import { ViewConfiguration } from "./src/View/ViewConfiguration";
import { UIActionEvent } from "./src/ClientActions/UIActionEvent";
import { VueApplication } from "./src/Application/VueApplication";
import { ApplicationConfiguration } from "./src/Application/ApplicationConfiguration";
import { useViewConfiguration } from "./src/composables/UI/useViewConfiguration";
import { BusinessObject } from "./src/Data/BusinessObject";
import { BORepository } from "./src/Data/Repositorys/BORepository";
import { type IViewDataConfiguration } from "./src/View/ViewDataConfiguration";
import { StateChangeTypes } from "./src/Data/Repositorys/StateChangeTypes";

import { SyncStateModes } from "./src/Data/StateManagement/SyncStateModes";
import { type IParameterBinding } from "./src/InteractionFlows/IParameterBinding";
import { ViewRoles } from "./src/View/ViewRoles";
import { ApplicationModes } from "./src/Application/ApplicationModes";
import { ApplicationModule } from "./src/Application/ApplicationModule";
import { ApplicationDeploymentModes } from "./src/Application/ApplicationDeploymentModes";
import { type IApplicationConfiguration } from "./src/Application/IApplicationConfiguration";
import { PublishScopes } from "./src/Data/DataAdapters/PublishScopes";
import { DataAdapterOptions } from "./src/Data/DataAdapters/DataAdapterOptions";
import { type IDataAdapter } from "./src/Data/DataAdapters/IDataAdapter";

import { DataAdapter } from "./src/Data/DataAdapters/DataAdapter";
import { type IViewConfiguration } from "./src/View/IViewConfiguration";
import { type IBOInstance } from "./src/Data/IBOInstance";
import { Screen } from './src/Models/Device/Screen'
import { ApplicationFactory } from './src/Application/ApplicationFactory'
import { type IApplication } from "./src/Application/IApplication";
import { type IStartup } from "./src/Application/IStartup";
import { ApplicationSettings } from "./src/Application/ApplicationSettings";
import { BOService } from "./src/Services/BOService";
import { Application } from "./src/Application/Application";
import { BrowserDownload } from "./src/BrowserDownload/BrowserDownload";
import { FileTypes } from "./src/Data/Enums/FileTypes";
import { Page } from "./src/View/Page";
import { type IPageConfiguration } from './src/View/IPageConfiguration';
import { IDataContainer } from "./src/Container/IDataContainer";
import { DefaultApplicationServiceCollection } from './src/Application/ServiceCollections/DefaultApplicationServiceCollection';
import { type IEventInvoker } from './src/ClientActions/EventHandler/IEventInvoker';
import { type IValueValidationViewConfiguration } from './src/View/ViewExtensions/ValueValidationViewConfiguration';
import { type IValidationRule } from './src/View/Interaction/Validation/IValidationRule';
import { DataContextManager } from './src/Data/StateManagement/DataContextManager';
import {CSSProvider } from './src/Stylesheets/CSSProvider';
import {CodeExecutor} from './src/CodeExecution/CodeExecutor.js';
import { type IExecutionContextProvider } from './src/CodeExecution/IExecutionContextProvider.js';
declare module 'alphautils'{

}



export {
    CodeExecutor,
    IExecutionContextProvider,
    AuthenticationMiddleware,
    CSSProvider,
    DataContextManager,
    EventBus,
    IValidationRule,
    IValueValidationViewConfiguration,
    IEventInvoker,
    BaseServiceProvider,
    IBOInstance,
    IDataContainer,
    IPageConfiguration,
    Page,
    DefaultApplicationServiceCollection,
    FileTypes,
    BrowserDownload,
    Application,
    BOService,
    ApplicationSettings,
    IStartup,
    ApplicationFactory,
    IApplication,
    Screen,
    type IViewConfiguration,
    DataAdapter,
    IDataAdapter,
    DataAdapterOptions,
    PublishScopes,
    IApplicationConfiguration,
    ApplicationDeploymentModes,
    ApplicationModule,
    ApplicationModes,
    ViewRoles,
    IParameterBinding,
    SyncStateModes,
    StateChangeTypes,
    IViewDataConfiguration,
    BORepository,
    BusinessObject,
    ApplicationConfiguration,
    VueApplication,
    useViewConfiguration,
    UIActionEvent,
    ViewConfiguration,
    ValueValidationViewElement,

    TabService,
    useSolutionService,
    createUniqueClientIdInContext,
    deepcopy,
    searchObjectInNestedArray,
    waitForElm,

    IService,

    

    IActionConfiguration,
    IUIAction,
    UIAction,
    UIActionFactory,
    UIActionTypes,
    IActionInput,



    useModellingStateManagementPlugin,
    ModellingContextStateManager,
    type CalledAndReverseAction,
     type ActionsAndState,
    type  StateManagerOptions,
    useApplicationStore,
    useWebNodeStore,
    useCreatorStore,
    useModellingStore,
    useWebNodeTemplateStore,
    type StateUpdate,
    type createElements,
    type deleteElements,
    type updateElements,
    type updateValues,
    type updateValue,
    type updateElement,
    type deleteElement,
    type createElement,


    UtilityModule,

    DataSources,
    KeyValuePair,
    SimpleNameValueCollection,
    SolutionObject,
    AxiosWrapper,
    HTTPClientService,
    type IExternalNetworkConfiguration,
    type IHTTPClientService,
  
    type IRequestConfig,
    LoggingService,

  
    type ITransactional,
    type ITransactionService,
    Transaction,
    TransactionService,
    BaseView,

    type IBaseView,

    type IHTMLAttributes,
    type WebNodeContext,
    type IBaseModellingButlerOptions,

    type IViewElement,

    ViewElement,

    BaseViewModel,
    type IViewModel,
    type IViewModelUsageOptions
};
