
//@ts-nocheck   
import { MaybeRefOrGetter } from "vue";
import { ViewElement } from "../ViewElement.ts";
import { type IValueValidationViewConfiguration } from "./ValueValidationViewConfiguration.ts";
import { validateRules } from "../Interaction/Validation/RuleValidator.ts";

export class ValueValidationViewElement extends ViewElement{

    constructor(config: MaybeRefOrGetter<IValueValidationViewConfiguration>) {
        super(config);
    }

    public ValidateRules(){
        const { contextProvider, contextid } = this.ProvideContext();
        return validateRules(contextProvider, contextid, this.GetConfiguration());
    }

}