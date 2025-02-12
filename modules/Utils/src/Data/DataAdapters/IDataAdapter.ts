import { Expression } from 'typescript';
import { IBOInstance } from '../IBOInstance.js';
import { StateChangeTypes } from '../Repositorys/StateChangeTypes.js';
import { SimpleNameValueCollection } from '../SimpleNameValueCollection.js';

export interface IDataAdapter{

    
    contextid?: number;
    stateChangeHandler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes) => void;
    beforeStateChangeHandler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes) => void;

    SetStateChangeHandler(handler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes, oldValue?: IBOInstance) => void)
    SetBeforeStateChangeHandler(handler: (id:number, newValue: IBOInstance, changeType: StateChangeTypes, oldValue?: IBOInstance) => void)

    Unsubscribe:() => void
    Subscribe:() => void
    Create:(value: IBOInstance, contextid?: number) => void

    Find(boName: string, expression: Expression)
    Get(expression: Expression)
    Update(id: number, newValue: IBOInstance, contextid?: number, oldValue?: IBOInstance)
    Delete(value: IBOInstance, contextid?: number)
    UpdatePartial(id: number, newValues: SimpleNameValueCollection, contextid?: number, optinalBoName?: string, oldValue?: IBOInstance)

    CommitHistory()

}