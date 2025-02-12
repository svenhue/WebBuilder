import { ITableColumn } from "./ITableColumn.js";
import { IViewConfiguration } from "alphautils";





interface ITableViewConfiguration extends IViewConfiguration{
    contextid: number;
    dataConfig: {
        columndatasource: string;
    }
    content:{
        label: string;
        columns: Array<ITableColumn>;
        initialRows: Array<object>;
    }
    properties:{
        rowsPerPageOptions: Array<number>;
        rowPrimaryKey: string;
        addOns: object[];
        //actions: object[];
        //interactions: object[];
        rowSelection: string; // single or multiple or none
        //eventHandlers: object[];
        editable: boolean;
        binaryStateSort: boolean;
        columnFilter: boolean;
    }
    appearance:{
        height: string; // auto or fixed
        rowHeight: string; // px or dynamic
        showTableBorder: boolean;
        tableHeaderStyle: CSSStyleDeclaration;
        tableStyle: CSSStyleDeclaration;
        virtualScrolling: boolean;
        visibleColumns: Array<string>;
    }
}

export { ITableViewConfiguration}