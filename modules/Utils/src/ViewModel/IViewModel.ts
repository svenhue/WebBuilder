import { ITransactionContextProvider } from "../Transaction/ITransactionContextProvider.js";

export interface IViewModel extends ITransactionContextProvider{
    name: string,
    sessioncontextid: number

}