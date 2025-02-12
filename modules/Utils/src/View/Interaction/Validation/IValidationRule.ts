export interface IValidationRule{
    name: string;
    rule: string // expression that return a boolean type
    errorMessage: string;
}