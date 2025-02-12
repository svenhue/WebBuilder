export interface IColumnFilter{
    field: string;
    value: object;
    operator: string;
    type: string;
    andOr: string;
    jsCode: string;
}