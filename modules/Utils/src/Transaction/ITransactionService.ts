import { KeyValuePair } from "../Data/KeyValuePair.js";
import { Transaction } from "./Transaction.js";

export interface ITransactionService{
    transaction: Transaction;
    BeginTransaction(contextid: number): Transaction;
    Commit (): void;
    UpdateNVC(keyValuePairs: Array<KeyValuePair>) : void;
}