import { IBOInstance } from "../Data/IBOInstance.js";
import { SimpleNameValueCollection } from "../Data/SimpleNameValueCollection.js";
import { KeyValuePair } from "../Data/KeyValuePair.js";
import { IUser } from "../DomainModels/IUser.js";
import { TransactionCallModes } from "./TransactionCallModes.js";

export class Transaction{
    
    id: string
    nvc: SimpleNameValueCollection
    targetBOIC: Array<IBOInstance> = new Array<IBOInstance>();
    user: IUser;
    callMode: TransactionCallModes

    constructor(contextid: number, nvc?: Array<KeyValuePair>){
        this.id = 'transaction_' + contextid;
        this.nvc = new SimpleNameValueCollection();
        if(nvc){
            nvc.forEach(kvp => {
                this.nvc.add(kvp.key, kvp.value);
            });
        }
    }   
}
