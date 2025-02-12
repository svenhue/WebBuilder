
interface StateUpdate{
    elementid: number;
    value: updateValue;
}

interface updateValue{
    key: string;
    value: any;
}

interface updateValues{
    elementid: number;
    values: Array<updateValue>;
}

type updateElement = (contextid: number, elementid: number, updateValues: Array<updateValue>, trackChanges?: boolean) => {success: boolean, message: string};

type updateElements = (contextid: number, updates: Array<updateValues>, trackChanges?: boolean) => {success: boolean, message: string};;

type deleteElement = (contextid: number, element: any, parentid?:number, trackChanges?: boolean) => any
type deleteElements = (contextid: number, elements: Array<any>, placeholder?:number, trackChanges?: boolean) => any

type createElement = (contextid: number, element: any, parentid?: number, trackChanges?: boolean) => any
type createElements = (contextid: number, elements: Array<any>, parentid?: number, trackChanges?: boolean) => any

export { type StateUpdate, type createElements, type deleteElements, type updateElements, type updateValues, type updateValue, type updateElement, type deleteElement, type createElement}