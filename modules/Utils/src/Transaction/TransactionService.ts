//@ts-ignore
import 'reflect-metadata';
import { injectable } from "inversify";
import { Transaction } from "./Transaction.js";
import { ITransactionService } from "./ITransactionService.js";
import { KeyValuePair } from '../Data/KeyValuePair.js';
import { TransactionCallModes } from './TransactionCallModes.js';


@injectable()
class TransactionService implements ITransactionService{

    transaction: Transaction;
    bindings: Array<(transaction: Transaction) => void> = new Array<(transaction: Transaction) => void>();

    constructor(){
      
    }


    BeginTransaction(contextid: number): Transaction {
        this.transaction = new Transaction(contextid);

        for(const callMode of Object.values(TransactionCallModes)){
            this.transaction.callMode = callMode;
            this.OnTransactionBegin();
        }
        

        return this.transaction;
    }
    private OnTransactionBegin(){
        for (const binding of this.bindings) {
            binding(this.transaction);
        }
    }
    Commit(){
        return;
    }
    public UpdateNVC(keyValuePairs: Array<KeyValuePair>){
        
        if(this.transaction == undefined){
            return;
        }
        for (const keyValuePair of keyValuePairs) {
            this.transaction.nvc.setValue(keyValuePair.key, keyValuePair.value)
        }
    }

    public BindOnTransactionBegin(handler: (transaction: Transaction) => void){
        this.bindings.push(handler);
    }

}

export { TransactionService}