//@ts-nocheck
import { inject, injectable } from "inversify";
import { IExecutionContextProvider } from "./IExecutionContextProvider.js";
import { useDataStore } from "../stores/useDataStore.js";
import { DataContextManager } from "../Data/StateManagement/DataContextManager.js";
import { IViewConfiguration } from "src/View/IViewConfiguration.js";
import { VueApplication } from "../Application/VueApplication.js";


//todo this hole approach will be inefficient with a lot of data and subscribers
//need to implement a better way to get the context


@injectable()
export class CodeContextProvider implements IExecutionContextProvider{

    private store: ReturnType<typeof useDataStore>;
    private contextManager: DataContextManager;
    private vueApplication: VueApplication;
    constructor(
        @inject('DataContextManager') contextManager: DataContextManager,
        @inject('Pinia') pinia: Pinia,
        @inject('VueApplication') app: VueApplication   
    ) {
        
        this.vueApplication = app;
       this.contextManager = contextManager;
       this.store = useDataStore(pinia);
    }

    public GetContext(contextid: number, requestingComponent?: IViewConfiguration, app: VueApplication) {
        if(contextid == undefined){
            throw new Error('contextid is undefined')
        }
        const components= {}
        const appContext = this.contextManager.findClosestContextById(contextid);
        this.store.GetBosByContext('ViewConfiguration', contextid)?.forEach((x) => {
            components[x.publicidentifier] = x;
        })

        const variables = {}
        // use context of level application
        this.store.GetBosByContext('GlobalVariable', appContext.contextid)[0]?.keyValuePairs?.forEach(x => variables[x.key] = x.value) ?? []

        const colors = {}

        this.store.GetBosByContext('Colors', appContext.contextid)?.forEach(x => colors[x.key] = x.value) ?? []

        return {
            components: components,
            variables: variables,
            colors: colors,
            component: requestingComponent,
            app:this.vueApplication
        }
    }

    public GetContextAttributes(): Array<string> {
        return ['components', 'variables', 'colors', 'component', 'app']
    }
}