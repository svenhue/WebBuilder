//@ts-nocheck   
import { IViewConfiguration } from "../IViewConfiguration.js";
import { IValidationRule } from "../Interaction/Validation/IValidationRule.js";

export interface IValueValidationViewConfiguration extends IViewConfiguration {

    properties:{
        inputType: string;
        rules: Array<IValidationRule>;
        isActive: boolean;
        
    }
}