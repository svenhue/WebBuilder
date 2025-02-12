import { IColumnFilter } from './IColumnFilter.js';

export interface ITableColumn{
    label: string;
    field: string;
    name: string;
    align: string;
    required: boolean;
    sortable: boolean;
    style: string;
    customFilter: IColumnFilter
    type: string; // text, number, date, boolean, image, icon, button, link, custom, textorExpressionInput
    useCellPopupEdit: boolean;
    position: number; 
}