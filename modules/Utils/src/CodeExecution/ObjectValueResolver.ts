import { IExecutionContextProvider } from "./IExecutionContextProvider.js";
import { ValueResolver } from "./ValueResolver.js";

export function ObjectValueResolver(contextProvider: IExecutionContextProvider, contextid: number, object: object){

    const resolvedObject = {};

    Object.entries(object).forEach(([key, value]) => {
        resolvedObject[key] = ValueResolver(contextProvider, contextid, value);
    });
    return resolvedObject;
}