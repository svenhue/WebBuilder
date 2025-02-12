import { ExpressionExecutor } from "./ExpressionExecutor";
import { IExecutionContextProvider } from "./IExecutionContextProvider"

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
        result = result.replace(match[0], x.value);
    }

    console.log(result)

    return new Function().apply(contextProvider.GetContext(contextid), contextProvider.GetContextAttributes())
}