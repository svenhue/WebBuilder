import { isRef, ref, Ref, resolveDirective, toValue } from "vue";
import { IStateHistory } from "./IStateHistory";
import { IHistoryEntry, IHistoryEntrys, IHistoryStack } from "./IHistoryStack";
import { IBOInstance } from "../../IBOInstance";
import { StateChangeTypes } from "../../Repositorys/StateChangeTypes";
import { IStateHistoryCommands } from "./IStateHistoryCommands";
import { SimpleNameValueCollection } from "src/Data/SimpleNameValueCollection";
import { v4 as uuidv4 } from 'uuid';
export class StateHistory implements IStateHistory{

    public redoStack: Ref<IHistoryStack>;
    public undoStack: Ref<IHistoryStack>;
    public history: Ref<IHistoryStack>;
    private fullhistory: Ref<IHistoryStack>;
    public contextid: number;
    public redoStackPreCommit: Ref<IHistoryStack>;
    public undoStackPreCommit: Ref<IHistoryStack>;

    private commands: Array<IStateHistoryCommands>;

    constructor(
        contextid: number, 
        commands: Array<IStateHistoryCommands>
        ){
        this.contextid = contextid;
        this.redoStack = ref({values: []});
        this.undoStack = ref({values: []});
        this.history = ref({values: []});
        this.fullhistory = ref({values: []});
        this.redoStackPreCommit = ref({values: []});
        this.undoStackPreCommit = ref({values: []});
        this.commands = commands;
    }

    public AddHistoryEntry(id: number, value: IBOInstance | SimpleNameValueCollection, oldValue: IBOInstance | SimpleNameValueCollection, stateChangeType: StateChangeTypes, commandName?: string, boName?: string){
        const entry: IHistoryEntrys = {
            isCommited: false,
            guid: uuidv4(),
                entrys: [ { 
                        //@ts-expect-error
                        id: value?.id ?? id,                     
                        stateChangeType: GetStateChangeType(stateChangeType),
                        oldValue: oldValue,
                        boName: boName,
                        value: value,
                        timestamp: Date.now()
                        }]

        }
        function GetStateChangeType(stateChangeType: StateChangeTypes){
                switch(stateChangeType){
                        case StateChangeTypes.create:
                                return StateChangeTypes.delete;
                        case StateChangeTypes.delete:
                                return StateChangeTypes.create;
                        case StateChangeTypes.update:
                                return StateChangeTypes.update;
                        case StateChangeTypes.updatePartial:
                                return StateChangeTypes.updatePartial;
                }
        }
        this.AddToUndoStack(
                entry
        );
    
        const originalValue: IHistoryEntrys = {
            isCommited: false,
            guid: uuidv4(),
            reverseGuid: entry.guid,
            entrys: [{
                    //@ts-expect-error
                    id: value.id,
                    stateChangeType: stateChangeType,
                    oldValue: oldValue,
                    boName: boName,
                    value: value,
                    timestamp: Date.now()
                    }]
        }
        this.fullhistory.value.values.push(originalValue);

    }
    // since we named the function AddToUndoStack (could be named addtohistory), we assume that we want an undo entry for every state change anytime!
    public AddToUndoStack(value: IHistoryEntrys){
        this.undoStackPreCommit.value.values.push(value);
    }

    public AddToRedoStack(value: IHistoryEntrys){
        this.redoStackPreCommit.value.values.push(value);
    }

    public GetLastUndoEntry(){
        return this.undoStack.value.values[this.undoStack.value.values?.length-1];
    }
    public GetLastRedoEntry(){
        return this.redoStack.value.values[this.redoStack.value.values?.length-1];
    }
    public ManualHistoryUndo(entrys: IHistoryEntrys){
        
        const undoEntry: IHistoryEntrys = this.undoStack.value.values.find(e => e.guid == entrys.reverseGuid)
        if(undoEntry == undefined){
            throw new Error('Undo entry not found')
        }

        
        for(const entry of this.GetEntrysByCreatedOrder(undoEntry.entrys)){
            const commandSet = this.GetCommandSet( entry.boName);
            let result;
            

            switch(entry.stateChangeType){

                case StateChangeTypes.create:
                    result = commandSet.create(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.delete:
                    //@ts-expect-error
                    result = commandSet.delete(entry.value.id, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.update:
                    //@ts-expect-error
                    result = commandSet.update(entry.value.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        
                    }
                    break;
                case StateChangeTypes.updatePartial:
                    result = commandSet.updatePartial(entry.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                       
                    }
                    break;
            }
            
        }
        this.redoStack.value.values.push(this.CreateRedoEntry(undoEntry));
        
        this.fullhistory.value.values.push(undoEntry)
        this.history.value.values = this.history.value.values.filter(v => v.guid != entrys.guid)
        this.undoStack.value.values = this.undoStack.value.values.filter(e => e.guid != undoEntry.guid);


    }
    public Undo(){

        const entrys = this.GetLastUndoEntry();
        if(entrys == null){
            return null;
        }
        
        for(const entry of this.GetEntrysByCreatedOrder(entrys.entrys)){
            const commandSet = this.GetCommandSet( entry.boName);
            let result;
            switch(entry.stateChangeType){

                case StateChangeTypes.create:
                    result = commandSet.create(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.delete:
                    //@ts-expect-error
                    result = commandSet.delete(entry.value.id, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.update:
                    if(entrys.entrys.find(e => e.id == entry.id && entry.stateChangeType == StateChangeTypes.delete)){
                        //we dont need to update an already deleted element
                        break;
                    }
                    //@ts-expect-error
                    result = commandSet.update(entry.value.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        
                    }
                    break;
                case StateChangeTypes.updatePartial:
                    if(entrys.entrys.find(e => e.id == entry.id && entry.stateChangeType == StateChangeTypes.delete)){
                        //we dont need to update an already deleted element
                        break;
                    }
                    result = commandSet.updatePartial(entry.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                       
                    }
                    break;
            }
            
        }
        
        const value = this.undoStack.value.values.pop()
        this.redoStack.value.values.push(this.CreateRedoEntry(entrys));
        
        // clear history

        const i =  this.history.value.values.findIndex(v => v.reverseGuid == entrys.guid)
        
        this.history.value.values.splice(i, 1)
        
        return value;
        

    }

    public Redo(){
        const entrys = this.GetLastRedoEntry();
        if(entrys == null){
            return null;
        }
        
        for(const entry of this.GetEntrysByCreatedOrder(entrys.entrys)){
            const commandSet = this.GetCommandSet(entry.boName);
            let result;
            switch(entry.stateChangeType){
                
                case StateChangeTypes.create:
                    result = commandSet.create(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.delete:
                    result = commandSet.delete(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.update:
                    //@ts-expect-error
                    result = commandSet.update(entry.value.id, entry.value, entry.oldValue, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.updatePartial:
                    result = commandSet.updatePartial(entry.id, entry.value, entry.oldValue, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
            }
        }


        const value = this.redoStack.value.values.pop()
        this.undoStack.value.values.push(this.CreateUndoEntry(entrys));
        
        this.history.value.values.push(entrys)
        return value;

    }

    public Commit(){
        /*
        if(this.redoStackPreCommit?.value?.values?.length > 0){
            const agg: IHistoryEntrys = {entrys: []};
            for(const entry of this.undoStackPreCommit.value.values){
                agg.entrys.push(...entry.entrys);
            }
            this.redoStack.value.values.push(agg);
        }
          */  
        
            

        if(this.fullhistory.value.values?.find(e => e?.isCommited == false) != undefined){
            const notCommited = this.fullhistory.value.values.filter(e => e.isCommited == false);
            const agg: IHistoryEntrys = 
            {
                isCommited: true,
                guid: uuidv4(),
                reverseGuid: "",
                entrys: []};
            for(const entry of notCommited.sort((a, b) => {
                const aTimestamp = a.entrys.length > 0 ? a.entrys[0].timestamp : 0;
                const bTimestamp = b.entrys.length > 0 ? b.entrys[0].timestamp : 0;
                return aTimestamp - bTimestamp;
            })){
                agg.reverseGuid = agg.reverseGuid + entry.guid
                agg.entrys.push(...entry.entrys);
            }
            this.history.value.values.push(agg);
            for(const toCommit of notCommited){
                toCommit.isCommited = true
            }
            if(this.undoStackPreCommit?.value?.values?.length > 0){
                const agg2: IHistoryEntrys = {
                    guid: agg.reverseGuid,
                    entrys: []};
                for(const entry of this.undoStackPreCommit.value.values){
                    agg2.entrys.push(...entry.entrys);
                }
                this.undoStack.value.values.push(agg2);
                this.undoStackPreCommit.value.values = [];
            }
        }
    }
    private createMergedGuid(entrys: IHistoryEntrys[]){
        let guid = "";
        for(const entry of entrys.sort((a, b) => {
            const aTimestamp = a.entrys.length > 0 ? a.entrys[0].timestamp : 0;
            const bTimestamp = b.entrys.length > 0 ? b.entrys[0].timestamp : 0;
            return aTimestamp - bTimestamp;
        })){
            guid = guid + entry.guid
          
        }
        return guid;

    }
    private GetCommandSet(boName: string){
        console.log(boName, this.commands)
        const commandSet = this.commands.find(c => c.boName == boName);
        if(commandSet == undefined){
            throw new Error('Command not found')
        }
        return commandSet;
    }
    private CreateRedoEntry(entry: IHistoryEntrys){
        const redoEntry: IHistoryEntrys = {entrys: []};
        for(const e of entry.entrys){
            switch(e.stateChangeType){
                case StateChangeTypes.create:
                        redoEntry.entrys.push({
                                boName: e.boName,
                                stateChangeType: StateChangeTypes.delete,
                                value: e.value,
                                oldValue: undefined,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.delete:
                        redoEntry.entrys.push({
                            boName: e.boName,
                                stateChangeType: StateChangeTypes.create,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.update:
                        redoEntry.entrys.push({
                            boName: e.boName,
                                id: e.id,
                                stateChangeType: StateChangeTypes.update,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.updatePartial:
                        redoEntry.entrys.push({
                            boName: e.boName,
                                id: e.id,
                                stateChangeType: StateChangeTypes.updatePartial,
                                value: e.value,
                                oldValue: e.value,
                                timestamp: Date.now()
                        });
                        break;
            }
        }
        return redoEntry;
    }

    private CreateUndoEntry(entry: IHistoryEntrys){
        const undoEntry: IHistoryEntrys = {entrys: []};
        for(const e of entry.entrys){
            switch(e.stateChangeType){
                case StateChangeTypes.create:
                        undoEntry.entrys.push({
                            boName: e.boName,
                                stateChangeType: StateChangeTypes.delete,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.delete:
                        undoEntry.entrys.push({
                            boName: e.boName,
                                stateChangeType: StateChangeTypes.create,
                                value: e.value,
                                oldValue: e.value,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.update:
                        undoEntry.entrys.push({
                            boName: e.boName,
                                stateChangeType: StateChangeTypes.update,
                                value: e.oldValue,
                                oldValue: e.value,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.updatePartial:
                   
                        undoEntry.entrys.push({
                            boName: e.boName,
                                stateChangeType: StateChangeTypes.updatePartial,
                                value: e.oldValue,
                                oldValue: e.value,
                                timestamp: Date.now(),
                                id: e.id
                        });
                        break;
            }
        }
        return undoEntry;
    }
    private GetEntrysByCreatedOrder(entrys: Array<IHistoryEntry>){
        return entrys.sort((a, b) => {
            if (a.timestamp === b.timestamp) {
                return b.id - a.id; // Sort by id descending if timestamps are equal
            }
            return b.timestamp - a.timestamp; // Sort by timestamp descending
        });
    }
}