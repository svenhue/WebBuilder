import { IStringLocale } from "./IStringLocale.js";

export interface IInternationalization {
    locales: Array<IStringLocale>
    defaultLocale: string
    langDir: string
    
}