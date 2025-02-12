import { IValidationRule } from './IValidationRule.js';
import { ValueResolver } from '../../../CodeExecution/ValueResolver.js';
import { IExecutionContextProvider } from '../../../CodeExecution/IExecutionContextProvider.js';
import { IValueValidationViewConfiguration } from 'src/View/ViewExtensions/ValueValidationViewConfiguration.js';

export function validateRules
    (
        contextProvider: IExecutionContextProvider, 
        contextid: number,
        component: IValueValidationViewConfiguration
    ) {

    if(component.properties?.rules == undefined || component.properties?.rules.length == 0){
        return []
    }
    // rules.forEach(rule => {
    //     return new Promise((resolve) => {
    //         const trueOrFalse = ValueResolver(contextProvider, contextid, rule.rule);
    //         if(trueOrFalse == true){
    //             resolve(true);
    //         }else if(trueOrFalse == false && rule.errorMessage == undefined){
    //             resolve(rule.errorMessage);
    //         }else{
    //             console.log('Validation failed', rule);
    //             return rule.errorMessage;
    //         }
    //     }
    // )});
    return component.properties?.rules.map(rule => {
        return () => ValueResolver(contextProvider, contextid, rule.rule, component) || rule.errorMessage;
    })
}