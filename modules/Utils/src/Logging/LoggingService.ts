import { injectable } from "inversify";
import { ref, Ref } from "vue";
import { ILogEntry } from "./ILogEntry";


@injectable()
export class LoggingService{
    
    private logs: Ref<Array<ILogEntry>>

    constructor(){
        this.logs = ref(new Array())
    }

    public log(value: any){
        const newEntry: ILogEntry = {
            value: value,
            timestamp: Date.now().toLocaleString()
        }
    }

    public getAll(){
        return this.logs.value
    }

    private saveToServer(){
        throw new Error("Not implemented yet!")
    }
}