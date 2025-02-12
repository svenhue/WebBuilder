//@ts-nocheck
import 'reflect-metadata'
import { IRepository } from "../Repositorys/IRepository.js";
import { DataAdapterOptions } from "./DataAdapterOptions.js";
import { IDataAdapter } from "./IDataAdapter.js";
import {  Container, injectable } from "inversify";
import { IBOInstance } from "../IBOInstance.js";
import { StateChangeTypes } from "../Repositorys/StateChangeTypes.js";
import { UtilityServices } from "../../Services/UtilityServices.js";
import { SimpleNameValueCollection } from '../SimpleNameValueCollection.js';
import { BOService } from '../Services/BOService.js';
import { Expression } from 'typescript';
import { HTTPClientService } from '../../HTTP/HTTPClientService.js';
import { BaseServiceProvider } from '../../Services/Provider/BaseServiceProvider.js';
import { BORepository } from '../Repositorys/BORepository.js';
import { GlobalDataSynchronizer } from './GlobalDataSynchronizer.js';

@injectable()
export class DataAdapter implements IDataAdapter {

    private ownsIds: Array<number> = []
    private options: DataAdapterOptions
    private repository: IRepository;
    private boService: BOService
    private synchronizer: GlobalDataSynchronizer
    contextid?: number;

    stateChangeHandler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes, oldValue?: IBOInstance) => void;
    beforeStateChangeHandler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes) => void;

    constructor(options: DataAdapterOptions, contextid?: number, container?: Container){
        this.contextid = contextid
        this.options = options
        const iotContainer = container ?? BaseServiceProvider.GetContainer(options.contextId ?? contextid)
        if(iotContainer == undefined){
            throw new Error('No iot container found for appcontext: ' + this.options.contextId)
        }

        this.repository = iotContainer.get<IRepository>(UtilityServices.BORepository) as BORepository
        if(this.options.subscribe != undefined){
            this.Subscribe()
        }
        this.boService = iotContainer.get<BOService>('BOService')
        
        if(options.persistGlobalStorage == true){
            this.synchronizer = iotContainer.get<GlobalDataSynchronizer>('GlobalDataSynchronizer')
        }
    }
    public Dispose(){
        this.Unsubscribe()
    }
    public Unsubscribe(){
        this.repository.Unsubscribe(this)
    }
    public SetStateChangeHandler(handler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes) => void){
        this.stateChangeHandler = handler
    }

    private HandleStateChange(id:number, newValue: IBOInstance, changeType: StateChangeTypes, oldValue?: IBOInstance){
        if(this.stateChangeHandler != undefined){
            this.stateChangeHandler(id, newValue, changeType, oldValue)
        }
    }
    public SetBeforeStateChangeHandler(handler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes) => void){
        this.beforeStateChangeHandler = handler
    }

    private HandleBeforeStateChange(id:number, newValue: IBOInstance, changeType: StateChangeTypes){
        if(this.beforeStateChangeHandler != undefined){
            this.beforeStateChangeHandler(id, newValue, changeType)
        }
    }

    public Subscribe(){
        this.repository.Subscribe(this)
    }

    public Create(value: IBOInstance, contextid?: number, addToHistory = true){
        if(value.id == undefined){
            this.boService.NewId(value)
        }
        if(contextid != undefined){
             value.contextid = contextid    
        }else if(value.contextid == undefined && value.contextid == undefined){
            value.contextid = this.options.contextId
        }
        this.SetBoType(value)
        
        if(this.options.persistGlobalStorage == true){
            this.synchronizer.SyncData(value, StateChangeTypes.create, this.options.apiDefinition)
        }
        


        this.ownsIds.push(value.id)
        return this.repository.Create(value as IBOInstance, this.options.persistLocalStorage, contextid, addToHistory)
    }
    public Find(boName: string, expression: Expression){
        return this.repository.Get(boName, expression)[0]
    }
    public Get(expression?: Expression){
        const result = this.repository.Get(this.options.boType.name, expression, this.options.contextId)

        if(result?.length == 1){
            return result[0]
        }
        return result
    }
    public GetAll(expression?: Expression){
        return this.repository.Get(this.options.boType.name, expression, this.options.contextId)
    }
    public Update(id: number, newValue: IBOInstance, contextid?: number, oldValue?: IBOInstance, addToHistory = true){
        this.SetBoType(newValue)
        return this.repository.Update(id, newValue, this.options.persistLocalStorage, contextid, oldValue, addToHistory)
    }
    public Delete(value: IBOInstance, contextid?: number, addToHistory = true){
        return this.repository.Delete(value, this.options.persistLocalStorage , contextid, addToHistory)
    }
    public UpdatePartial(id: number, newValues: SimpleNameValueCollection, contextid?: number, optinalBoName?: string , oldValue?: IBOInstance, addToHistory = true){
        return this.repository.UpdatePartial(id, newValues, this.options.persistLocalStorage, contextid, optinalBoName, oldValue, addToHistory)
    }

    private SetBoType(value: IBOInstance){
        if(value.boName == undefined){
            if(this.options.boType?.name == undefined){
                throw new Error('No BO with id ' + value.id + ' cant be created because no BO Type is defined');
            }
            value.boName = this.options?.boType?.name
        }
    }

    public CommitHistory(){
        this.repository.CommitHistory(this.contextid ?? this.options.contextId)
    }

    


}