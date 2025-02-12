import { IViewConfiguration } from "alphautils";
import { ImageSource } from "./ImageSource.js";

export interface IImageViewConfiguration extends IViewConfiguration {
    
    properties:{
        src: string
    }
}