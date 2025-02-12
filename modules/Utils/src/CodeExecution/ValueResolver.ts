import { ExpressionExecutor } from "./ExpressionExecutor.js";
import { ExpressionValidator } from "./ExpressionValidator.js";
import { IExecutionContextProvider } from "./IExecutionContextProvider.js";

export function ValueResolver(contextProvider: IExecutionContextProvider, contextid: number, value, requestingComponent?, useReactive = false) : string | number | boolean{
    
    if (ExpressionValidator.ValidateExpression(value) == true) {

        if(useReactive == true)
            return ExpressionExecutor(contextProvider, contextid, value, requestingComponent);
        else
            return ExpressionExecutor(contextProvider, contextid, value, requestingComponent).value;
    }

    
    return value;
}