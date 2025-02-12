import { IStringLocale } from "./IStringLocale";

export interface IInternationalization {
    locales: Array<IStringLocale>
    defaultLocale: string
    langDir: string
    
}