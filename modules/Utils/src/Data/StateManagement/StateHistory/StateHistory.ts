import { isRef, ref, Ref, resolveDirective, toValue } from "vue";
import { IStateHistory } from "./IStateHistory";
import { IHistoryEntrys, IHistoryStack } from "./IHistoryStack";
import { IBOInstance } from "../../IBOInstance";
import { StateChangeTypes } from "../../Repositorys/StateChangeTypes";
import { IStateHistoryCommands } from "./IStateHistoryCommands";

export class StateHistory implements IStateHistory{

    public redoStack: Ref<IHistoryStack>;
    public undoStack: Ref<IHistoryStack>;
    public contextid: number;
    public redoStackPreCommit: Ref<IHistoryStack>;
    public undoStackPreCommit: Ref<IHistoryStack>;

    private commands: IStateHistoryCommands;

    constructor(
        contextid: number, 
        commands: IStateHistoryCommands
        ){
        this.contextid = contextid;
        this.redoStack = ref({values: []});
        this.undoStack = ref({values: []});
        this.redoStackPreCommit = ref({values: []});
        this.undoStackPreCommit = ref({values: []});
        this.commands = commands;
    }

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
    public Undo(){

        const entrys = this.GetLastUndoEntry();
        if(entrys == null){
            return null;
        }
        for(const entry of entrys.entrys){
            let result;
            switch(entry.stateChangeType){

                case StateChangeTypes.create:
                    result = this.commands.create(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.delete:
                    result = this.commands.delete(entry.value.id, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
                case StateChangeTypes.update:
                    result = this.commands.update(entry.value.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        
                    }
                    break;
                case StateChangeTypes.updatePartial:
                    result = this.commands.updatePartial(entry.id, entry.oldValue, entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                       
                    }
                    break;
            }
            
        }
        
        const value = this.undoStack.value.values.pop()
           this.redoStack.value.values.push(this.CreateRedoEntry(entrys));
            return value;
        

    }

    public Redo(){
        const entrys = this.GetLastRedoEntry();
        if(entrys == null){
            return null;
        }
        for(const entry of entrys.entrys){
            let result;
            switch(entry.stateChangeType){
                
                case StateChangeTypes.create:
                    result = this.commands.create(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.delete:
                    result = this.commands.delete(entry.value, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.update:
                    result = this.commands.update(entry.value.id, entry.value, entry.oldValue, false);
                    if(!result[0]){
                        //todo handlerror
                        return null;
                    }
                    break;
                case StateChangeTypes.updatePartial:
                    result = this.commands.updatePartial(entry.id, entry.value, entry.oldValue, false);
                    if(!result[0]){
                        //todo handlerror
                    }
                    break;
            }
        }


            const value = this.redoStack.value.values.pop()
            
           this.undoStack.value.values.push(this.CreateUndoEntry(entrys));
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
        if(this.undoStackPreCommit?.value?.values?.length > 0){
            const agg: IHistoryEntrys = {entrys: []};
            for(const entry of this.undoStackPreCommit.value.values){
                agg.entrys.push(...entry.entrys);
            }
            this.undoStack.value.values.push(agg);
            this.undoStackPreCommit.value.values = [];
        }
    }

    private CreateRedoEntry(entry: IHistoryEntrys){
        const redoEntry: IHistoryEntrys = {entrys: []};
        for(const e of entry.entrys){
            switch(e.stateChangeType){
                case StateChangeTypes.create:
                        redoEntry.entrys.push({
                                stateChangeType: StateChangeTypes.delete,
                                value: e.value,
                                oldValue: undefined,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.delete:
                        redoEntry.entrys.push({
                                stateChangeType: StateChangeTypes.create,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.update:
                        redoEntry.entrys.push({
                                id: e.id,
                                stateChangeType: StateChangeTypes.update,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.updatePartial:
                        redoEntry.entrys.push({
                                id: e.id,
                                stateChangeType: StateChangeTypes.updatePartial,
                                value: e.value,
                                oldValue: e.oldValue,
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
                                stateChangeType: StateChangeTypes.delete,
                                value: e.value,
                                oldValue: e.oldValue,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.delete:
                        undoEntry.entrys.push({
                                stateChangeType: StateChangeTypes.create,
                                value: e.value,
                                oldValue: e.value,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.update:
                        undoEntry.entrys.push({
                                stateChangeType: StateChangeTypes.update,
                                value: e.oldValue,
                                oldValue: e.value,
                                timestamp: Date.now()
                        });
                        break;
                case StateChangeTypes.updatePartial:
                   
                        undoEntry.entrys.push({
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

}