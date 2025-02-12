import { IBOInstance } from "alphautils";
import { UITemplateTypes } from "./UITemplateTypes";

export interface TemplateDto extends IBOInstance{
    name: string;
    description: string;
    value: string;
    type: UITemplateTypes;
    isFree: boolean;
    isPublic: boolean;
    file: string
    imageFileBase64 : string
    fileName: string
    imageUrl: string
}