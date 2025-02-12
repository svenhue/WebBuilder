import { Transaction } from "./Transaction.js";

export interface ITransactionContextProvider{
    OnTransactionBegin ( transaction: Transaction) : void
}