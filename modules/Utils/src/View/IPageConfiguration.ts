import { IViewConfiguration } from "./IViewConfiguration.js";
import { IPageHeader } from "./Page/IPageHeader.js";
import { IPageMeta } from "./Page/IPageMeta.js";

export interface IPageConfiguration extends IViewConfiguration{
    name: string,
    meta: IPageMeta,
    head: IPageHeader
    views: IViewConfiguration[]
    css: string
}