import { Type } from "typescript";

export type IStateSetter ={
    key: string,
    type: Type,
    exec: (any) => void;
};