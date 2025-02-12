import { Container, interfaces } from 'inversify';
import { IStartup } from '../IStartup.js';
import { BORepository } from '../../Data/Repositorys/BORepository.js';
import { BOService } from '../../Services/BOService.js';
import { IApplicationConfiguration } from '../IApplicationConfiguration.js';
import { Screen } from '../../Models/Device/Screen.js';
import { DataContextManager } from '../../Data/StateManagement/DataContextManager.js';
import { SendRequestAction } from '../../ClientActions/Actions/SendRequest/SendRequestAction.js';
import { SetValueAction } from '../../ClientActions/Actions/ValueSetters/SetValueAction.js';
import { SetValuesAction } from '../../ClientActions/Actions/ValueSetters/SetValuesAction.js';
import { ITransactionService } from '../../Transaction/ITransactionService.js';
import { TransactionService } from '../../Transaction/TransactionService.js';
import { UIActionFactory } from '../../ClientActions/UIActionFactory.js';
import { DataAdapter } from '../../Data/DataAdapters/DataAdapter.js';
import { IDataAdapter } from '../../Data/DataAdapters/IDataAdapter.js';
import { DataFederation } from '../../Data/DataFederation/DataFederation.js';
import { ApplicationFactory } from '../ApplicationFactory.js';
import { TabService } from '../../Services/TabService.js';
import { EventBus } from '../../ClientActions/EventHandler/EventBus.js';
import { GlobalStateProvider } from '../../Data/StateManagement/GlobalStateProvider.js';
import { HTTPClientService } from '../../HTTP/HTTPClientService.js';
import { ControlComponentAction } from '../../ClientActions/Actions/ControlComponent/ControlComponentAction.js';
import { IExecutionContextProvider } from '../../CodeExecution/IExecutionContextProvider.js';
import { CodeContextProvider } from '../../CodeExecution/CodeContextProvider.js';
import { ApplicationModes } from '../ApplicationModes.js';
import { inject } from 'vue';
import { Pinia } from 'pinia';
import { AuthenticationService } from '../../Services/Auth/AuthenticationService.js';
import { WorkflowEngine } from '../../ClientActions/Workflow/WorkflowEngine.js';
import { CallServiceAction } from '../../ClientActions/Actions/CallService/CallServiceAction.js';
import { GlobalDataSynchronizer } from '../../Data/DataAdapters/GlobalDataSynchronizer.js';
import { RestrictedServiceProvider } from '../../Services/Provider/RestrictedServiceProvider.js';
import { IHTTPClientService } from '../../HTTP/IHTTPClientService.js';

export class DefaultApplicationServiceCollection implements IStartup{

    public InitializeServices(container: Container, config:  IApplicationConfiguration, pinia: Pinia){
        
        if(pinia == undefined){
            throw new Error('pinia is undefined')
        }
        
        container.bind<IApplicationConfiguration>('ApplicationConfiguration').toConstantValue(config);

        let authConfig = config?.networkConfigs?.find(x => x.authentication != undefined)?.authentication;
        
        if(authConfig == undefined){
            authConfig = {}
        }
        
       container.bind<ITransactionService>("TransactionService")
                .to(TransactionService)
                .inSingletonScope();
        container.bind<WorkflowEngine>("WorkflowEngine").to(WorkflowEngine).inSingletonScope();
               container.bind<GlobalDataSynchronizer>("GlobalDataSynchronizer").to(GlobalDataSynchronizer).inSingletonScope();
                //dataadapter
               container.bind<IDataAdapter>("DataAdapter").toConstructor(DataAdapter);
               container.bind<interfaces.Newable<IDataAdapter>>("DataAdapterConstructor").toConstructor(DataAdapter);
                //data federation
               container.bind<DataFederation>("DataFederation").toConstructor(DataFederation);
               container.bind<DataContextManager>("DataContextManager").to(DataContextManager).inSingletonScope();
               container.bind<Pinia>("Pinia").toConstantValue(pinia);
                //repositorys
               container.bind<BORepository>('BORepository').to(BORepository).inSingletonScope();

               // todo: bad practive
               // unique ids across apps
               if(config.mode == ApplicationModes.shadow){
                const boService = inject<Container>('iotcontainer_0', undefined)?.get<BOService>('BOService')
                container.bind<BOService>("BOService").toConstantValue(boService);  
               }else{
                container.bind<BOService>("BOService").to(BOService).inSingletonScope();
               }
              
            
               container.bind<Screen>("Screen").to(Screen).inSingletonScope();

               container.bind<ApplicationFactory>("ApplicationFactory").to(ApplicationFactory).inSingletonScope();

               container.bind<TabService>("TabService").to(TabService).inSingletonScope();

               container.bind<EventBus>("EventBus").to(EventBus).inSingletonScope();

                container.bind<GlobalStateProvider>("GlobalStateProvider").to(GlobalStateProvider).inSingletonScope();
                container.bind<UIActionFactory>("UIActionFactory").to(UIActionFactory).inSingletonScope();

                container.bind<IHTTPClientService>("HTTPClientService").to(HTTPClientService).inSingletonScope();

                container.bind<SendRequestAction>('SendRequestAction').to(SendRequestAction).inSingletonScope(),
                container.bind<SetValueAction>('SetValueAction').to(SetValueAction).inSingletonScope(),
                container.bind<SetValuesAction>('SetValuesAction').to(SetValuesAction).inSingletonScope(),
                container.bind<ControlComponentAction>('ControlComponentAction').to(ControlComponentAction).inSingletonScope(),
                container.bind<CallServiceAction>('CallServiceAction').to(CallServiceAction).inSingletonScope(),

        
                container.bind<IExecutionContextProvider>('ExecutionContextProvider').to(CodeContextProvider).inSingletonScope();

                container.bind<RestrictedServiceProvider>('RestrictedServiceProvider').to(RestrictedServiceProvider).inSingletonScope();

                const authService = new AuthenticationService(container.get<IHTTPClientService>('HTTPClientService'), authConfig);
                container.bind<AuthenticationService>("AuthenticationService").toConstantValue(authService);


    }
}