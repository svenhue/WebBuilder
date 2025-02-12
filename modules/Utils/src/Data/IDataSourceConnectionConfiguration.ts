import { DataSourceConnectionTypes } from "./DataSourceConnectionTypes.js";

export interface IDataSourceConnectionConfiguration {

    uuid: string;
    name: string;
    type: DataSourceConnectionTypes;

}