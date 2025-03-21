import { IApplicationConfiguration } from "alphautils";
import { RemoteRepositoryModel, VersionManager } from "localversioncontrol";
import { IRemoteRepository } from "localversioncontrol/src/IRepository";
import { ApplicationModel } from "src/Models/ApplicationModel";

export class ApplicationVersionManager extends VersionManager{

    constructor(model: ApplicationModel){
        super(new RemoteRepositoryModel(model.remoteRepository))
    }

    public SyncRepository(model: ApplicationModel){

        if(model.version == '0.0.1'){
            this.PushContent(this.createVirtualRepository(model as ApplicationModel))
        }
    }

    private createVirtualRepository(model: ApplicationModel){
        const repository: IRemoteRepository = {
            contents: []
        }
        
        repository.contents.push({
            path: 'AppConfigs/pages.ts',
            content: model.toTS()
        })

        return repository;
    }
}