//@ts-ignore
//@ts-nocheck

import { BusinessObject, IDataAdapter, DataAdapterOptions, IApplicationConfiguration, SimpleNameValueCollection } from 'alphautils';
import { useDataStore } from 'alphautils';
import { DataContextManager } from 'alphautils/src/Data/StateManagement/DataContextManager';
import {injectable, interfaces, Container } from 'inversify';

@injectable()
export class GlobalVariableDataProvider{

    private contextManager: DataContextManager;

    //todo handle global var state in production env?!
    public Provide(
        config: IApplicationConfiguration,
        dataAdapter: interfaces.Newable<IDataAdapter>,
        contextManager: DataContextManager,
        container: Container
    ){
        
        this.contextManager = contextManager;
        
        
        this.ProvideContainer(config.contextid, dataAdapter, config);
        container.bind<GlobalVariableDataProvider>('GlobalVariableDataProvider').toConstantValue(this);

    }
    public ProvideContainer(contextid: number, dataAdapter, config){
        const variableCollection = new SimpleNameValueCollection();

        if(config.globalVariables?.vars?.keyValuePairs != undefined){
            for(const keyValuePair of config.globalVariables.vars.keyValuePairs){
                variableCollection.add(keyValuePair.key, keyValuePair.value);
            }
        }
        variableCollection.boType = new BusinessObject({
            name: 'GlobalVariable'
        })

        const appcontext = this.contextManager.findClosestContextById(contextid);
        const adapterConfig = new DataAdapterOptions({
            boType: new BusinessObject({
                name: 'GlobalVariable',
            }),
            contextId: appcontext.contextid,
            persistLocalStorage:true
        })
        const adapter = new dataAdapter(adapterConfig, appcontext.contextid);
       
        adapter.Create(variableCollection, appcontext.contextid, false);

    }

    public GetVariable(contextid: number, key: string){
        const context = this.contextManager.findClosestContextById(contextid);
        const store = useDataStore();
        const container = store.containers.find(c => c.contextid == context.contextid && c.boType.name == 'GlobalVariable');
        const collection = container?.value[0] as SimpleNameValueCollection;
        const kvp = collection?.keyValuePairs?.find(kvp => kvp.key == key);
        return kvp?.value;
    }
    public SetVariable(contextid: number, key: string, value: string){

        const context = this.contextManager.findClosestContextById(contextid);
        const store = useDataStore();
        const container = store.containers.find(c => c.contextid == context.contextid && c.boType.name == 'GlobalVariable');
        const collection = container?.value[0] as SimpleNameValueCollection;
        const kvp = collection.keyValuePairs?.find(kvp => kvp.key == key);
        if(kvp != undefined){
            kvp.value = value;
        }
        else{
            collection.keyValuePairs.push({key: key, value: value});
        }
    }

    public static RemoveVariable(contextid: number, key: string){
        const store = useDataStore();
        const container = store.containers.find(c => c.contextid == contextid && c.boType.name == 'GlobalVariable');
        const collection = container?.value[0] as SimpleNameValueCollection;
        collection.remove(key);
    }

    public GetVariables(contextid: number){
        const store = useDataStore();
        const appContext = this.contextManager.findClosestContextById(contextid);
        const container = store.containers?.find(c => c.contextid == appContext.contextid && c.boType.name == 'GlobalVariable');
        const collection = container?.value[0] as SimpleNameValueCollection;
        return collection?.keyValuePairs;
    }
}