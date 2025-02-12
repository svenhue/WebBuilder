import { IViewConfiguration } from "alphautils";
import { IFormField } from "./IFormField.js";



export interface IFormViewConfiguration extends IViewConfiguration{
    content:{
        fields: Array<IFormField>
    }
    
}