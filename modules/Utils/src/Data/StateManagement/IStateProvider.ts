import { Type } from "typescript";

export type IStateProvider = {
    key: string,
    type: Type,  
    exec: () => any;
}