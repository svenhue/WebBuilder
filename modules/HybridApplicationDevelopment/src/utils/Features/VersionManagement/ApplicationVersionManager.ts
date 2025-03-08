import { IApplicationConfiguration } from "alphautils";
import { RemoteRepositoryModel, VersionManager } from "localversioncontrol";

export class ApplicationVersionManager extends VersionManager{

    constructor(model: RemoteRepositoryModel){
        super(model)
    }

    public SyncRepository(model: IApplicationConfiguration){

        if(model.version == '0.0.1'){
            this.PushContent({
                
            })
        }
    }
}