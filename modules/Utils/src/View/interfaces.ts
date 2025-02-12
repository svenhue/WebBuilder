import { ViewConfiguration } from './ViewConfiguration.js';

interface WebNodeContext{
    contextid: number, 
    webnodes: Array<ViewConfiguration>,
    optionaluniquename?: string
    applicationid?: number,
}


interface IHTMLAttributes{
    style?: any,
    class?: string,
    innerHTML?: string,
    d?: Array<[string, number]> | string;
    fill?: string;
    stroke?: string;
    xmlns?: string;
    id?: string,
    draggable?: boolean,
    transform?: string,
    viewBox?: string,
    'stroke-width': string,
    width?: string,
    height?: string,
    x: string,
    y: string,
    to: string
    radius: number,
    instance: any, // domain specific instance
    ondragstart?: (event: DragEvent) => void,
}

interface IBaseModellingButlerOptions{
    positionhelper?: boolean,
}


export type { IHTMLAttributes, WebNodeContext, IBaseModellingButlerOptions}