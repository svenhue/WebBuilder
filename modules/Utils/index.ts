//@ts-ignore
//@ts-nocheck

import 'reflect-metadata'

import { UtilityModule } from "./src/UtilityModule.js";

import { type IPageHeader } from "./src/View/Page/IPageHeader.js";
import { type IPageMeta } from "./src/View/Page/IPageMeta.js";

import { DataSources } from "./src/Data/DataSources.js";
import { KeyValuePair } from "./src/Data/KeyValuePair.js";
import { SimpleNameValueCollection } from "./src/Data/SimpleNameValueCollection.js";
import { SolutionObject } from "./src/Data/SolutionObject.js";

import { AxiosWrapper } from "./src/HTTP/AxiosWrapper.js";
import { HTTPClientService } from "./src/HTTP/HTTPClientService.js";
import { type IExternalNetworkConfiguration } from "./src/HTTP/IExternalNetworkConfiguration.js";
import { type IHTTPClientService } from "./src/HTTP/IHTTPClientService.js";
import { type IRequestConfig } from "./src/HTTP/IRequestConfig.js";

import { LoggingService } from "./src/Logging/LoggingService.js";




import { type ITransactional } from "./src/Transaction/ITransactional.js";
import { type ITransactionService } from "./src/Transaction/ITransactionService.js";
import { Transaction } from "./src/Transaction/Transaction.js";
import { TransactionService } from "./src/Transaction/TransactionService.js";
import { BaseView } from "./src/View/BaseView.js";


import { type IBaseView } from "./src/View/IBaseView.js";
import { type IHTMLAttributes, type WebNodeContext, type IBaseModellingButlerOptions} from "./src/View/interfaces.js";
import { type IViewElement } from "./src/View/IViewElement.js";
import { ViewElement } from "./src/View/ViewElement.js";

import { BaseViewModel } from "./src/ViewModel/BaseViewModel.js";
import { type IViewModel } from "./src/ViewModel/IViewModel.js";
import { type IViewModelUsageOptions } from "./src/ViewModel/IViewModelUsageOptions.js";

import {type StateUpdate, type createElements,type deleteElements, 
    type updateElements,type  updateValues,type updateValue,type updateElement, 
    type deleteElement,type createElement } from "./src/stores/storeUtils.js";

import { useApplicationStore } from "./src/stores/useApplicationStore.js";
import { useWebNodeStore } from "./src/stores/useWebNodeStore.js";
import { useCreatorStore } from "./src/stores/useCreatorStore.js";
import { useModellingStore } from "./src/stores/useModellingStore.js";
import { useWebNodeTemplateStore } from "./src/stores/useWebNodeTemplateStore.js";

import { useModellingStateManagementPlugin, ModellingContextStateManager,  type CalledAndReverseAction, type ActionsAndState, type StateManagerOptions } from "./src/stores/Plugins/ModellingcontextStateManager.js";

import { type IActionConfiguration } from "./src/ClientActions/IActionConfiguration.js";
import { type IUIAction } from "./src/ClientActions/IUIAction.js";
import { type IUIEvent } from "./src/ClientActions/EventHandler/IUIEvent.js";
import { UIEvents } from "./src/ClientActions/EventHandler/UIEvents.js";
import { UIEventTypes } from "./src/ClientActions/EventHandler/UIEventTypes.js";
import { UIAction } from "./src/ClientActions/UIAction.js";

import { UIActionFactory } from "./src/ClientActions/UIActionFactory.js";
import { UIActionTypes } from "./src/ClientActions/UIActionTypes.js";
import { type IActionInput } from "./src/ClientActions/IActionInput.js";
import { type ISetValueActionOptions } from "./src/ClientActions/Actions/ValueSetters/ISetValueActionOptions.js";
import { type ISetValuesActionOptions } from "./src/ClientActions/Actions/ValueSetters/ISetValuesActionOptions.js";
import { SetterActionTargetTypes } from "./src/ClientActions/Actions/ValueSetters/SetterActionTargetTypes.js";
import { type IRequestData } from "./src/ClientActions/Actions/SendRequest/IRequestData.js";
import { type IRequestHeader } from "./src/ClientActions/Actions/SendRequest/IRequestHeader.js";
import { RequestMethods } from "./src/ClientActions/Actions/SendRequest/RequestMethods.js";
import { type ISendRequestActionOptions } from "./src/ClientActions/Actions/SendRequest/ISendRequestActionConfig.js";
import { type ISendRequestAction } from "./src/ClientActions/Actions/SendRequest/ISendRequestAction.js";


import { SetValueAction } from "./src/ClientActions/Actions/ValueSetters/SetValueAction.js";


import { SetValuesAction } from "./src/ClientActions/Actions/ValueSetters/SetValuesAction.js";
import { SendRequestAction } from "./src/ClientActions/Actions/SendRequest/SendRequestAction.js";



import { type IService } from "./src/Services/IService.js";
import { type IViewModelService } from "./src/Services/IViewModelService.js";


import { createUniqueClientIdInContext } from "./src/composables/createUniqueClientIdInContext.js";
import { deepcopy } from "./src/composables/deepcopy.js";

import { searchObjectInNestedArray } from "./src/composables/searchObjectInNestedArray.js";
import { waitForElm } from "./src/composables/useWaitforElement.js";

import { TabService } from "./src/Services/TabService.js";
import { useSolutionService } from "./src/Services/SolutionService.js";
import { ViewConfiguration } from "./src/View/ViewConfiguration.js";
import { UIActionEvent } from "./src/ClientActions/UIActionEvent.js";
import { VueApplication } from "./src/Application/VueApplication.js";
import { ApplicationConfiguration } from "./src/Application/ApplicationConfiguration.js";
import { useViewConfiguration } from "./src/composables/UI/useViewConfiguration.js";
import { BusinessObject } from "./src/Data/BusinessObject.js";
import { BORepository } from "./src/Data/Repositorys/BORepository.js";
import { type IViewDataConfiguration } from "./src/View/ViewDataConfiguration.js";


import { StateChangeTypes } from "./src/Data/Repositorys/StateChangeTypes.js";

import { SyncStateModes } from "./src/Data/StateManagement/SyncStateModes.js";

import { type IParameterBinding } from "./src/InteractionFlows/IParameterBinding.js";
import { ViewRoles } from "./src/View/ViewRoles.js";
import { ApplicationModes } from "./src/Application/ApplicationModes.js";
import { ApplicationModule } from "./src/Application/ApplicationModule.js";
import { type IBOInstance } from './src/Data/IBOInstance.js';

import { ApplicationDeploymentModes } from "./src/Application/ApplicationDeploymentModes.js";
import { type IApplicationConfiguration } from "./src/Application/IApplicationConfiguration.js";
import { PublishScopes } from "./src/Data/DataAdapters/PublishScopes.js";
import { DataAdapterOptions } from "./src/Data/DataAdapters/DataAdapterOptions.js";
import { type IDataAdapter } from "./src/Data/DataAdapters/IDataAdapter.js";
import { DataAdapter } from "./src/Data/DataAdapters/DataAdapter.js";
import { type IViewConfiguration } from "./src/View/IViewConfiguration.js";
import { Screen } from './src/Models/Device/Screen.js'
import { ApplicationFactory } from './src/Application/ApplicationFactory.js'
import { type IApplication } from "./src/Application/IApplication.js";
import { type IStartup } from "./src/Application/IStartup.js";
import { ApplicationSettings } from "./src/Application/ApplicationSettings.js";
import { BOService } from "./src/Services/BOService.js";
import { Application } from "./src/Application/Application.js";
import { Page } from "./src/View/Page.js";
import { BrowserDownload } from "./src/BrowserDownload/BrowserDownload.js";
import { FileTypes } from "./src/Data/Enums/FileTypes.js";
import { Filter } from "./src/Query/Filter.js";
import { Query } from "./src/Query/Query.js";
import { FilterChain } from './src/Query/FilterChain.js';
import { FilterOperators } from './src/Query/FilterOperators.js';
import { type IExpression } from './src/Query/IExpression.js';
import { type IFilterCondition } from './src/Query/IFilterCondition.js';
import { DataTypes } from './src/Data/DataTypes.js';
import { DefaultApplicationServiceCollection } from './src/Application/ServiceCollections/DefaultApplicationServiceCollection.js';
import { type IPageConfiguration } from './src/View/IPageConfiguration.js';
import { BaseServiceProvider } from './src/Services/Provider/BaseServiceProvider.js'
import { ControlComponentAction } from './src/ClientActions/Actions/ControlComponent/ControlComponentAction.js';
import { GlobalStateProvider } from './src/Data/StateManagement/GlobalStateProvider.js';
import { EventBus } from './src/ClientActions/EventHandler/EventBus.js';
import { type IDataContainer } from './src/Container/IDataContainer.js';
import { DataContextManager } from './src/Data/StateManagement/DataContextManager.js';
import { useDataStore } from './src/stores/useDataStore.js';
import { Split as SplitStyle} from './src/composables/useSplitStyleInValueAndUnit.js';
import { nthIndex } from './src/composables/getNthIndexofString.js';
import { ContextLevel } from './src/Data/StateManagement/ContextLevel.js';
import { ValueResolver } from './src/CodeExecution/ValueResolver.js';
import { ExpressionValidator } from './src/CodeExecution/ExpressionValidator.js';
import { CodeContextProvider } from './src/CodeExecution/CodeContextProvider.js';
//export * from 'axios'
import { type IValidationRule } from './src/View/Interaction/Validation/IValidationRule.js';
import { validateRules } from './src/View/Interaction/Validation/RuleValidator.js';
import { ValueValidationViewElement } from './src/View/ViewExtensions/ValueValidationViewElement.js';
import {CSSProvider } from './src/Stylesheets/CSSProvider.js';
import { type IEventInvoker } from './src/ClientActions/EventHandler/IEventInvoker.js';
import { type IValueValidationViewConfiguration } from './src/View/ViewExtensions/ValueValidationViewConfiguration.js';
import { BODeclarationContainer } from './src/Container/BODeclarationContainer.js';
import { AuthenticationMiddleware } from './src/Services/Auth/AuthenticationMiddleware.js';    
import { AuthenticationMechanism } from './src/Application/Authentication/AuthenticationMechanism.js';
import { APITypes } from './src/Data/DataAdapters/APITypes.js';
import { RestrictedServiceProvider} from './src/Services/Provider/RestrictedServiceProvider.js';
import { ObjectValueResolver } from './src/CodeExecution/ObjectValueResolver.js';
import {CodeExecutor} from './src/CodeExecution/CodeExecutor.js';
import { type IExecutionContextProvider } from './src/CodeExecution/IExecutionContextProvider.js';
export {
    IPageHeader,
    IPageMeta, 
    IExecutionContextProvider,
    CodeExecutor,
    ObjectValueResolver,
    RestrictedServiceProvider,
    APITypes,
    AuthenticationMechanism,
    AuthenticationMiddleware,
    BODeclarationContainer,
    IValueValidationViewConfiguration,
    IEventInvoker,
    CSSProvider,
    ValueValidationViewElement,
    IValidationRule,
    validateRules,
    CodeContextProvider,
    ExpressionValidator,
    ValueResolver,
    ContextLevel,
    nthIndex,
    SplitStyle,
    useDataStore,
    DataContextManager,
    IDataContainer,
    ControlComponentAction,
    GlobalStateProvider,

    EventBus,
    BaseServiceProvider,
    IPageConfiguration,
    Page,
    DefaultApplicationServiceCollection,
    DataTypes,
    FilterOperators,
    FilterChain,
    IFilterCondition,
    IExpression,
    Filter,
    Query,
    
    type IBOInstance,
    FileTypes,
    BrowserDownload,
    Application,
    BOService,

    ApplicationSettings,
    type IStartup,
    type IApplication,
    ApplicationFactory,
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
    type IParameterBinding,
    SyncStateModes,
    StateChangeTypes,
    IViewDataConfiguration,
    BORepository,
    BusinessObject,
    useViewConfiguration,
    ApplicationConfiguration,
    VueApplication,
    ViewConfiguration,

    UIActionEvent,
    TabService,
    useSolutionService,
    createUniqueClientIdInContext,
    deepcopy,
    searchObjectInNestedArray,
    waitForElm,
    
    type IService,
    type IViewModelService,
    UIEventTypes,
    type IActionConfiguration,
    type IUIAction,
    type IUIEvent,
     UIEvents,
    UIAction,
 
    UIActionFactory,
    UIActionTypes,
    type  IActionInput,
    type  ISetValueActionOptions,
    type  ISetValuesActionOptions,
    SetterActionTargetTypes,
    type  IRequestData,
    type  IRequestHeader,
    RequestMethods,
    type  ISendRequestActionOptions,
    type  ISendRequestAction,
    SetValueAction,
    SetValuesAction,
    SendRequestAction,


    useModellingStateManagementPlugin,
    ModellingContextStateManager,
     CalledAndReverseAction,
     ActionsAndState,
     StateManagerOptions,
    useApplicationStore,
    useWebNodeStore,
    useCreatorStore,
    useModellingStore,
    useWebNodeTemplateStore,
    StateUpdate,
    createElements,
    deleteElements,
    updateElements,
    updateValues,
    updateValue,
    updateElement,
    deleteElement,
    createElement,


    UtilityModule,

    DataSources,
    KeyValuePair,
    SimpleNameValueCollection,
    SolutionObject,
    AxiosWrapper,
    HTTPClientService,
    IExternalNetworkConfiguration,
    IHTTPClientService,
    IRequestConfig,
    LoggingService,

    ITransactional,
    ITransactionService,
    Transaction,
    TransactionService,
    BaseView,

    type IBaseView,

    IHTMLAttributes,
    WebNodeContext,
    IBaseModellingButlerOptions,

    type IViewElement,

    ViewElement,

    BaseViewModel,
    type  IViewModel,
    type IViewModelUsageOptions
}
