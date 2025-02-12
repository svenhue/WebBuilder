import { FilterOperators } from "./FilterOperators.js";

export interface IFilterCondition{
    field: string;
    value: string | number | boolean;
    operator: FilterOperators;
    type: string;
    jsCode: string;
}