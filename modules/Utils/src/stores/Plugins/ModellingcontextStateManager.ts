//todo: fix types
// @ts-nocheck
import { PiniaPluginContext, StateTree, Store, StoreOnActionListenerContext } from 'pinia';
import { updateValue, updateValues} from '../storeUtils';
import { ViewElement } from '../View/ViewElement.js';
import {get } from 'lodash-es'


interface ActionExtension{
    args: Array<any>;
}

interface ActionsAndState{
    calledActionName: string;
    calledActionInput: object;
    reverseActionName: string;
    reverseActionInput: object;
}
interface CalledAndReverseAction{
    calledActionName: string;
    reverseActionName: string;
}

interface StateManagerOptions{
    methods: Array<CalledAndReverseAction>;
}
interface ContextStateHistory{
    contextid: number;
    stateChanges: Array<ActionsAndState>;
    currentTrackingStateIndex: number;
}
class ModellingContextStateManager{

    store: Store
    stateHistory: Array<ContextStateHistory> = new Array<ContextStateHistory>()

    constructor(store: Store){
        this.store = store
        if(this.validateStore() == true){
            this.store.$onAction((action ) => {
                    if(action.name.startsWith('deleteElements')){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveDeletedStateChanges(action)
                        }
                    }else if(action.name.startsWith('createElements')){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveCreatedStateChanges(action)
                        }
                    }
                    else if(action.name.startsWith('createElement')){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveCreatedStateChange(action)
                        }
                    }
                    else if(action.name =='updateElements'){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveUpdatedStateChanges(action)
                        }
                    }
                    else if(action.name.startsWith('updateElement')){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveUpdatedStateChange(action)
                        }
                    }else if(action.name.startsWith('deleteElement')){
                        if(this.validateActionRestriction(action.args) == true){
                            this.saveDeletedStateChange(action)
                        }
                    }
                
            })
        }
    }
    simulateUpdateOneAction(contextid: number, element: object, updates: Array<updateValue>){
        const state = this.stateHistory.find(h => h.contextid == contextid)
        if(state != undefined){
            const stateChange: ActionsAndState = {
                calledActionName: 'updateElement',
                calledActionInput: this.getUpdateOneAcionCalledInput(contextid, element, updates),
                reverseActionName: 'updateElement',
                reverseActionInput: [contextid, element, updates, true]
            }

            state.stateChanges.splice(state.currentTrackingStateIndex,0, stateChange)
            state.currentTrackingStateIndex += 1
        }
    }
    private validateStore(){
        if(this.store['createElement'] == undefined){
            return false
        }
        if(this.store['deleteElement'] == undefined){
            return false
        }
        if(this.store['updateElement'] == undefined){
            return false
        }
        if(this.store['updateElements'] == undefined){
            return false
        }
        if(this.store['deleteElements'] == undefined){
            return false
        }

        return true;
    }
    isUndoAble(state: ContextStateHistory){  
        if(state.currentTrackingStateIndex > 0){
            return true;
        }
        return false;
    }
    isRedoAble(state: ContextStateHistory){
        if(state.currentTrackingStateIndex < state.stateChanges.length){
            return true;
        }
    }
    undo(contextid: number){

        const state = this.stateHistory.find(h => h.contextid == contextid)
            if(state != undefined){
                if(this.isUndoAble(state) == true){

                    if(state?.currentTrackingStateIndex < 0){
                        return;
                    }
                    const stateChange = state?.stateChanges[state.currentTrackingStateIndex -1]
                    if(this.validateManagerActionRestriction(stateChange.calledActionInput) == true){

                        this.callReverseAction(stateChange)
                        state.currentTrackingStateIndex -= 1;

                    }
                return
                }
            }

    }
    redo(contextid: number){
        const state = this.stateHistory.find(h => h.contextid == contextid)
            if(state != undefined){
                if(this.isRedoAble(state) == true){
                    if(state?.currentTrackingStateIndex >= state.stateChanges.length){
                        return;
                    }
                    const stateChange = state?.stateChanges[state.currentTrackingStateIndex]
                        this.callAction(stateChange)
                        state.currentTrackingStateIndex += 1;
                        console.log(stateChange, state.currentTrackingStateIndex, state?.stateChanges)

                return;
                }
            }
    }
    validateManagerActionRestriction(args:object){
        if(this.store['validateStateManagementRestrictions'] != undefined){
        return this.store['validateStateManagementRestrictions'](args[0], args[1])
        }else{
            return false;
        }
    }

    validateActionRestriction(args: object){
        if(this.store['validateStateManagementRestrictions'] != undefined
            && args[3] == true){
            return this.store['validateStateManagementRestrictions'](args[0], args[1])
        }else{
            return false;
        }
    }
    callAction(stateChange: ActionsAndState){
        if(stateChange.calledActionName == 'updateElements'){
            this.callUpdateMobjectAction(stateChange.calledActionInput)
        }
        else if(stateChange.calledActionName == 'updateElement'){
            this.callUpdateAction(stateChange.calledActionInput)
        }else if(stateChange.calledActionName == 'createElement'){
            this.callCreateAction(stateChange.calledActionInput)
        }else if(stateChange.calledActionName == 'deleteElement'){
            this.callDeleteAction(stateChange.calledActionInput)
        }else if(stateChange.calledActionName == 'deleteElements'){
            this.callDeleteMobjectAction(stateChange.calledActionInput)
        }
    }

    callReverseAction(stateChange: ActionsAndState){
            if(stateChange.reverseActionName == 'updateElements'){
                this.callUpdateMobjectAction(stateChange.reverseActionInput)
            }
            else if(stateChange.reverseActionName == 'updateElement'){
                this.callUpdateAction(stateChange.reverseActionInput)
            }else if(stateChange.reverseActionName == 'createElement'){
                this.callCreateAction(stateChange.reverseActionInput)
            }else if(stateChange.reverseActionName == 'deleteElement'){
                this.callDeleteAction(stateChange.reverseActionInput)
            }else if(stateChange.reverseActionName == 'deleteElements'){
                this.callDeleteMobjectAction(stateChange.reverseActionInput)
            }else if(stateChange.reverseActionName == 'createElements'){
                this.callCreateMobjectAction(stateChange.reverseActionInput)
            }

    }

    callUpdateAction(args: object){
        this.store['updateElement'](args[0], args[1], args[2], false )
    }
    callCreateAction(args: object){
        this.store['createElement'](args[0], args[1], args[2], false)
    }
    callCreateMobjectAction(args: object){
        this.store['createElements'](args[0], args[1], undefined, false)
    }
    callUpdateMobjectAction(args: object){
        this.store['updateElements'](args[0], args[1], undefined, false)
    }
    callDeleteAction(args: object){
        this.store['deleteElement'](args[0], args[1], args[2], false)
    }
    callDeleteMobjectAction(args: object){
        this.store['deleteElements'](args[0], args[1], undefined, false)
    }

    registerContextStateIfNotExists(contextid: number){
        if(this.stateHistory.find(h => h.contextid == contextid) == undefined){
            this.stateHistory.push({
                contextid: contextid,
                stateChanges: new Array<ActionsAndState>(),
                currentTrackingStateIndex: 0
            })
        }   
    }
    saveCreatedStateChanges(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, G,A>){
        
        if(action.name != 'createElements'){
            throw new Error('saveCreatedStateChange: name your create action "createElements"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){

            if(this.store['deleteElements'] == undefined){
                throw new Error('saveCreatedStateChange: name your delete action "deleteElements", otherwise your statechanges triggerd by "createElement" will not be reversible')
            }
            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: 'deleteElement',
                calledActionInput: action.args,
                reverseActionInput: action.args
            }
            change.calledActionInput[3] = false;
            change.reverseActionInput[3] = false;
            console.log(change)
            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }
    saveCreatedStateChange(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, G,A>){
        
        if(action.name != 'createElement'){
            throw new Error('saveCreatedStateChange: name your create action "createElement"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){

            if(this.store['deleteElement'] == undefined){
                throw new Error('saveCreatedStateChange: name your delete action "deleteElement", otherwise your statechanges triggerd by "createElement" will not be reversible')
            }
            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: 'deleteElement',
                calledActionInput: action.args,
                reverseActionInput: action.args
            }
            change.calledActionInput[3] = false;
            change.reverseActionInput[3] = false;
            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }
    saveDeletedStateChanges(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, ActionExtension,ActionExtension>){
        if(action.name != 'deleteElements'){
            throw new Error('saveDeletedStateChange: name your delete action "deleteElement"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){

            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: 'createElements',
                calledActionInput: action.args,
                reverseActionInput: action.args
            }
            change.calledActionInput[3] = false;
            change.reverseActionInput[3] = false;

            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }
    saveDeletedStateChange(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, ActionExtension,ActionExtension>){
        if(action.name != 'deleteElement'){
            throw new Error('saveDeletedStateChange: name your delete action "deleteElement"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){

            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: 'createElement',
                calledActionInput: action.args,
                reverseActionInput: action.args
            }
            change.calledActionInput[3] = false;
            change.reverseActionInput[3] = false;
            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }

    saveUpdatedStateChange(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, G,A>){

        if(action.name != 'updateElement'){
            throw new Error('saveUpdatedStateChange: name your update action "updateElement"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){
            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: action.name,
                calledActionInput: action.args,
                reverseActionInput: this.getUpdateOneAcionReverseInput(action)
            }
            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }
    saveUpdatedStateChanges(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, G,A>){
        if(action.name != 'updateElements'){
            throw new Error('saveUpdatedStateChange: name your update action "updateElements"')
        }
        let state = this.stateHistory.find(h => h.contextid == action.args[0])
        this.registerContextStateIfNotExists(action.args[0])
        if(state == undefined){
            state = this.stateHistory.find(h => h.contextid == action.args[0])
        }
        if(state != undefined){
   
            const change: ActionsAndState = {
                calledActionName: action.name,
                reverseActionName: action.name,
                calledActionInput: action.args,
                reverseActionInput: this.getUpdateMobjectAcionReverseInput(action)
            } 
            state.stateChanges.splice(state.currentTrackingStateIndex,0, change)
            state.currentTrackingStateIndex += 1
        }
    }
    getUpdateOneAcionCalledInput(contextid: number, element: object, updates: Array<updateValue>){
        
        const node: ViewElement = this.store['byId'](contextid, element.id);
        const newState = [
            contextid,
            node.value,
            Array<updateValue>(),
            true
        ]
        for(const update of updates){
            newState[2].push({
                key: update.key,
                value: get(node.value, update.key)
            })
        }
        return newState;
    }
    getUpdateOneAcionReverseInput(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, string, string>){
        
        const node: ViewElement = this.store['byId'](action.args[0], action.args[1]);
        const oldstate = [
            action.args[0],
            node.id,
            Array<updateValue>(),
            true
        ]
        for(const update of action.args[2]){
            oldstate[2].push({
                key: update.key,
                value: get(node.value, update.key)
            })
        }
        return oldstate;
    }
    getUpdateMobjectAcionReverseInput(action: StoreOnActionListenerContext<typeof this.store.$id, StateTree, string, string>){
        
        const node: ViewElement = this.store['byId'](action .args[0], action.args[1]);
        const oldstate = [
            action.args[0],
            node.id,
            Array<updateValues>(),
            false
        ]
        for(const update of action.args[2]){
            const updateState ={
                elementid: update.elementid,
                value: Array<updateValue>()
            }
            for(const updateValue of update.value){
                updateState.value.push({
                    key: updateValue.key,
                    value: get(node, updateValue.key)
                })
            }
            oldstate[2].push(updateState)
        }
        return oldstate;
    }
}


function useModellingStateManagementPlugin(context: PiniaPluginContext){
    if(context.store.$id.includes('webnodecontext')){
        const manager = new ModellingContextStateManager(context.store)
        return {
            stateManager : manager,
        }
    }
}
export { useModellingStateManagementPlugin, ModellingContextStateManager, type CalledAndReverseAction, type ActionsAndState, type StateManagerOptions}