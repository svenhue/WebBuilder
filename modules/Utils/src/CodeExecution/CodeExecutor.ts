import { ExpressionExecutor } from "./ExpressionExecutor.js";
import { IExecutionContextProvider } from "./IExecutionContextProvider.js"

export function CodeExecutor(
    contextProvider: IExecutionContextProvider, 
    contextid: number, 
    expression: string, 
    requestingComponent?) {

    let result = expression;

    const regEx = /\{\{(.*?)\}\}/g;

    const r = regEx.exec(expression);

    for(const match of r){
        const x = ExpressionExecutor(contextProvider, contextid, match[1], requestingComponent);
        result = result.replace(match[0], x.value.toString());
    }

    console.log(result)

    return new Function().apply(contextProvider.GetContext(contextid), contextProvider.GetContextAttributes())
}