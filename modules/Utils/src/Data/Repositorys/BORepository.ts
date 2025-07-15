//@ts-nocheck
import 'reflect-metadata'

import { inject, injectable } from 'inversify';
import { useDataStore } from '../../stores/useDataStore.js';
import { IBOInstance } from '../IBOInstance.js';
import { BusinessObject } from '../BusinessObject.js';
import { BODataContainer } from '../../Container/BODataContainer.js';
import { IDataAdapter } from '../DataAdapters/IDataAdapter.js';
import { StateChangeTypes } from './StateChangeTypes.js';
import { IRepository } from './IRepository.js';
import { SimpleNameValueCollection } from '../SimpleNameValueCollection.js';
import { set, get } from 'lodash-es'
import { Expression } from 'typescript';
import { DataContextManager } from '../StateManagement/DataContextManager.js';
import { IDataContainer } from '../Container/IDataContainer.js';
import { Pinia } from 'pinia';
import { computed, ref, Ref, toValue } from 'vue';
import { StateHistory } from '../StateManagement/StateHistory/StateHistory.js';
import { HistorySteps } from '../StateManagement/StateHistory/HistorySteps.js';
import { IHistoryEntry, IHistoryEntrys } from '../StateManagement/StateHistory/IHistoryStack.js';
import { IStateHistoryCommands } from '../StateManagement/StateHistory/IStateHistoryCommands.js';
import { KeyValuePair } from '../KeyValuePair.js';

@injectable()
export class BORepository implements IRepository{
      
        private store: ReturnType<useDataStore>
        private subscribers: Array<IDataAdapter> = []
        private contextManager: DataContextManager;
        private BOIds: Array<number> = []
        private pinia : Pinia;
        private history: Array<StateHistory>


        constructor(
            @inject('DataContextManager') contextManager: DataContextManager,
            @inject('Pinia') pinia: Pinia   
        ){
            this.contextManager = contextManager;
            this.pinia = pinia;
            this.store = useDataStore(pinia)
            this.history = new Array();
        }
        //how to handle this with datadapter sync?
        public setHistoryIsSavedPermanently(contextid: number, guid: string, isSavedPermanently: boolean){
                const history = this.GetHistoryToStack(contextid);
                history.history.value.values.forEach((value: IHistoryEntrys) => {
                        value.isSavedPermanently = true
                })
        }
        public static MergeKeyValueCollection(newvalues: KeyValuePair[], oldValue: IBOInstance): IBOInstance{
                for(const keyValuePair of newvalues){
                        const old = get(oldValue, keyValuePair.key)

                        if(old == undefined){
                                set(oldValue, keyValuePair.key, keyValuePair.value)
                                continue;
                        }
                        else if(Array.isArray(keyValuePair.value)){
                                if(!Array.isArray(old)){
                                        set(oldValue, keyValuePair.key, keyValuePair.value) 
                                }else{
                                        for(const value of keyValuePair.value.filter(v => old.includes(v) == false)){
                                                old.push(value)
                                        }
                                }
                        }else if(typeof old == 'object'){
                                throw new Error("Object merge not implemented")
                        }else if(typeof old == 'number' || typeof old == 'string'){
                                set(oldValue, keyValuePair.key, keyValuePair.value)
                        }else if(typeof old == 'boolean'){
                                 set(oldValue, keyValuePair.key, keyValuePair.value)
                        }
                        else{
                                throw new Error(`${typeof old} merge not implemented`)
                        }
                }
                return oldValue
        }


        public CreateMany(bos: Array<IBOInstance>, persistslocalStore = false, contextid:number = null, useHistory = true){
                for(const bo of bos){
                        this.Create(bo, persistslocalStore, contextid, useHistory);
                }
        }

        //todo merge objects ( from non-partial update)

        public Create(value: IBOInstance, persistslocalStore = false, contextid: number = null, useHistory = true){
                if(persistslocalStore == true){
                        let containerId = this.store.containers.find(c => c.boType?.name == value.boName)?.id;

                        if(containerId == undefined){
                                containerId = this.CreateContainer(value, contextid);
                        }
                        const container = this.store.containers.find(c => c.id == containerId) as IDataContainer;

                        if(container.HasBoWithId(value)){
                                return this.Update(value.id, value, persistslocalStore, contextid, undefined, false)

                        }
                }


                this.Publish(value.id, value, StateChangeTypes.create, contextid, undefined, undefined, true)

                if(contextid == null){
                        const contextid = this.contextManager.NewContext();
                        value.contextid = contextid.contextid;
                }

                if(persistslocalStore == true){
                        

                        let containerId = this.store.containers.find(c => c.boType?.name == value.boName)?.id;

                        if(containerId == undefined){
                                containerId = this.CreateContainer(value, contextid);
                        }
                        
                        /*this.store.$patch((state) => {
                                state.containers?.find(c => c.id == containerId).value.push(value);
                                
                        })
                                */

                        const container = this.store.containers.find(c => c.id == containerId) as IDataContainer;
                        container.AddValue(value)
                }
                this.Publish(value.id, value, StateChangeTypes.create, contextid, undefined, undefined, false)
                if(useHistory){
                        this.AddToHistory(contextid, value, StateChangeTypes.create, undefined, undefined, value.boName)
                }
                return value;
        }
        //todo the state shadowonwer (most cases the viewmodel) has to provide undo/ redo functions for all types of bos
        public CreateHistory(contextid: number, commands: IStateHistoryCommands[]){
                if(!contextid) throw new Error('ContextId is required to create a history stack');
                if(commands?.length > 0){
                        for(const commandSet of commands){
                                if(!commandSet.create){
                                        commandSet.create = this.Create
                                }
                                if(!commandSet.delete){
                                        commandSet.delete = this.Delete
                                }
                                if(!commandSet.update){
                                        commandSet.update = this.Update
                                }
                                if(!commandSet.delete){
                                        commandSet.delete = this.Delete
                                }
                        }
                }else{
                        commands = [
                                {
                                        boName: 'View',
                                        create: (value, addToHistory) => this.Create(value, false, undefined, addToHistory),
                                        delete: (id, contextid, addToHistory) => this.Delete(id, false, contextid, addToHistory),
                                        update: (id, value, oldValue, addToHistory) => this.Update(id, value, oldValue, false, contextid, addToHistory),
                                        updatePartial: (id, value, oldValues, addToHistory) => this.UpdatePartial(id, value, oldValues, false, contextid, addToHistory)
                                } as IStateHistoryCommands,
                        ]
                }
                const history = new StateHistory(contextid, commands);
                this.history.push(history);
                return history
        }
        public CommitHistory(contextid: number){
                let history = this.GetHistoryToStack(contextid);
                history.Commit();
        }

                        //todo: config that only parent can update childs or child context can only update their historystackentrys?


        public GetHistoryComputed(contextid: number){
                return computed(() => {
                        const stack = this.GetHistoryToStack(contextid);      
                        return {
                                redoStack: stack?.redoStack,
                                undoStack: stack?.undoStack,
                                history: stack?.history
                        }
                })
        }
        public Undo(contextid: number){
                const history = this.GetHistoryToStack(contextid);
                return history.Undo();
        }
        public Redo(contextid: number){
                const history = this.GetHistoryToStack(contextid);
                return history.Redo();
        }


        public ManualHistoryUndo(contextid: number, item: IHistoryEntrys){
                const history = this.GetHistoryToStack(contextid);
                return history.ManualHistoryUndo(item);
        }

        public Get(boName: string, expression?: Expression, contextid: number = null){
                let container: IDataContainer;
                if(contextid == null){
                        container = this.store.containers.find(c => c.boType.name == boName);
                }else{
                        container = this.store.containers.find(c => c.boType.name == boName && c.contextid == contextid);
                }
                if(container == undefined){
                        return [];
                }
                if(expression == undefined){
                        return container.value;
                }
              
                return container.value.filter(expression);
        }
        public Update(
                id: number, 
                newValue: IBOInstance, 
                persistslocalStore = false, 
                contextid: number = null, 
                oldValue,
                addToHistory = true
        ){
                if(persistslocalStore == false){
                        this.Publish(id, newValue, StateChangeTypes.update, contextid, undefined, oldValue, true)
                }
                if(persistslocalStore == true){

                        const container = this.store.containers.find(c => c.boType.name == newValue.boName && c.contextid == contextid);
                        
                        if (oldValue == undefined){
                                //oldValue = this.store.$state.containers.find(c => c.boType.name == newValue.boName).value[i];
                        }
                        container.ReplaceValueBo(newValue);  
                }
                this.Publish(id, newValue, StateChangeTypes.update, contextid, undefined, oldValue, false)
                if(addToHistory){
                        this.AddToHistory(contextid, newValue, StateChangeTypes.update, oldValue, undefined, newValue.boName)
                }
                return newValue;
        }
        public Delete(
                value: IBOInstance, 
                persistslocalStore = false, 
                contextid: number = null,
                addToHistory = true        
                ){
                if(value == undefined){
                        //todo this edge case shouldnt be needed
                        return;
                }
                this.Publish(value.id, value, StateChangeTypes.delete, contextid, undefined, undefined, true)

                if(persistslocalStore == true){
                        const i = this.store.containers.findIndex(c => c.value.findIndex(v => v.id == value.id) != -1);

                        if(i == -1){
                                throw new Error('No BO with id ' + value.id + ' found');
                        }
                       
                                this.store.containers[i].value.splice(this.store.containers[i].value.findIndex(v => v.id == value.id), 1);
                       
                }
                this.Publish(value.id, value, StateChangeTypes.delete, contextid, undefined, undefined, false)
                if(addToHistory){
                        this.AddToHistory(contextid, value, StateChangeTypes.delete, undefined, undefined, value.boName)
                }
        }

        public UpdatePartial(
                id:number, 
                newValues: SimpleNameValueCollection, 
                persistLocalStorage = false, 
                contextid: number = null, 
                optionalBoName: string, 
                oldValue?: SimpleNameValueCollection,
                addToHistory = true
        ){
                //idgas
                        let oldValues = new SimpleNameValueCollection()
                        if(oldValue?.keyValuePairs == undefined && oldValue != undefined){
                                const old = JSON.parse(JSON.stringify(oldValue))
                                for(const keyValue of newValues.keyValuePairs){
                                        oldValues.add(keyValue.key, get(old, keyValue.key))
                                }
                                //BORepository.MergeKeyValueCollection(newValues.keyValuePairs, old)
                        }else{
                                oldValues = oldValue;
                        }
                        this.Publish(id, newValues, StateChangeTypes.updatePartial, contextid, optionalBoName, oldValue, true)
                
              

                if(persistLocalStorage == true){
                        
                        let i = this.store.containers.findIndex(c => c.value.findIndex(v => v.id == id) != -1);

                        if(i == -1){
                                //bo already deleted
                                //edge case!?
                                return;
                        }
                        const bo = this.store.containers[i].value.find(v => v.id == id);
                        if(i == -1){
                                throw new Error('No BO with id ' + id + ' found');
                        }
                        /*if (oldValue == undefined){
                                oldValue = this.store.$state.containers.find(c => c.boType.name == bo.boName).value[i];
                        }
                                */
                                        
                        //this.store.$patch(() => {
                                for(const newValue of newValues.keyValuePairs){
                                        set(bo, newValue.key, newValue.value)
                                }
                        //})

                }
                this.Publish(id, newValues, StateChangeTypes.updatePartial, contextid, optionalBoName, oldValues, false)
                
               if(addToHistory){
                        this.AddToHistory(contextid, newValues, StateChangeTypes.updatePartial, oldValues, id, optionalBoName)
               }
        }

        public Subscribe(subscriber: IDataAdapter){
                subscriber.id = this.subscribers.length+1;
                this.subscribers.push(subscriber);
        }
        public Unsubscribe(subscriber: IDataAdapter){
                this.subscribers = this.subscribers.filter(s => s.id == subscriber.id);
        }
        private CreateContainer(value: IBOInstance, contextid?:number){

                let boType: BusinessObject;
                if(value.boType == undefined && value.boName != undefined){
                        boType = new BusinessObject({
                                name: value.boName,
                                propertys: []
                        })
                }else if (value.boType != undefined){
                        boType = value.boType;
                }
                const container = new BODataContainer(boType, [])
                container.contextid = contextid;
                this.store.AddContainer(container);
                return container.id;                
        }
        private async Publish(
                id:number, 
                value: IBOInstance | SimpleNameValueCollection, 
                changeType: StateChangeTypes, 
                contextid: number = null, 
                optinalBoName?: string, 
                oldValue?: IBOInstance, 
                before: boolean = false)
                {
                for(const subscriber of this.subscribers){
                        if(contextid == null ){
                                if((value.boName == subscriber.options.boType.name || optinalBoName == subscriber.options.boType.name ) && !this.AdapterIsBOOwner(subscriber, value)){
                                        this.NotifySubscriber(subscriber, id, value, changeType, oldValue, before);
                                }
                        }else if(contextid == subscriber.contextid){
                                if((value.boName == subscriber.options.boType.name || value.boName == null) && !this.AdapterIsBOOwner(subscriber, value)){
                                        this.NotifySubscriber(subscriber, id, value, changeType, oldValue, before);
                                }
                        }
                        
                }
        }
        private AdapterIsBOOwner(subscriber: IDataAdapter, value: IBOInstance): boolean{
                return subscriber.ownsIds.includes(value.id) ? true : false;
        }
        private async NotifySubscriber(adapter: IDataAdapter, id:number, value, changeType: StateChangeTypes, oldValue, before: boolean){
                if(before == true){
                        adapter?.HandleBeforeStateChange(id, value, changeType, oldValue);
                        return;
                }else{
                        adapter?.HandleStateChange(id, value, changeType, oldValue);
                }
        }
        private GetHistoryToStack(contextid: number){
                let history = this.history.find(h => h.contextid == contextid);
                if(history == undefined){
                        const appContext = this.contextManager.GetRootContext()

                        if(appContext == undefined){
                                throw new Error('No context with id ' + contextid + ' found');
                        }
                        history = this.history.find(h => h.contextid == appContext.contextid);
                }
                if(history == undefined){
                        history = this.CreateHistory(contextid)
                }
                return history;
        }
                //todo oimplement this logic directly in historystack class
        private AddToHistory(
                contextid: number,
                v: IBOInstance | SimpleNameValueCollection, 
                stateChangeType: StateChangeTypes, 
                oldV?: IBOInstance | SimpleNameValueCollection, 
                id:number,
        boName: string){
                const value = toValue(v);
                const oldValue = toValue(oldV);
                const history = this.GetHistoryToStack(contextid);
                
                history.AddHistoryEntry(id, value, oldValue, stateChangeType, undefined, boName);
        
        }
        
}