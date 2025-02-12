import { IDataSourceConnectionConfiguration } from "../Data/IDataSourceConnectionConfiguration.js";
import { BusinessObject } from "../Data/BusinessObject.js";
import { DataSources } from "../Data/DataSources.js";
import { SyncStateModes } from "../Data/StateManagement/SyncStateModes.js";

export interface IViewDataConfiguration{
    syncStateMode?: SyncStateModes
    boType?: BusinessObject
    datasource: DataSources
    queryId?: string //if source is query
    scriptId?: string //if source is javascript
    connection?: IDataSourceConnectionConfiguration //if source is connect data

}