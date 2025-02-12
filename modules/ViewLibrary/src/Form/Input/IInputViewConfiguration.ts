import { IValidationRule, IValueValidationViewConfiguration } from "alphautils";

export interface IInputViewConfiguration extends IValueValidationViewConfiguration {

    content:{
        value: string | number | boolean;
        type: string;
    }

    properties:{

        inputType: string;
        rules: Array<IValidationRule>;
        isActive: boolean;
        showLabelInField: boolean;
        
    }
}