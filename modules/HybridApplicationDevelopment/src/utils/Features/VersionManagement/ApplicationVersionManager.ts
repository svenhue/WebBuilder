import { IApplicationConfiguration } from "alphautils";

import { ApplicationModel } from "src/Models/ApplicationModel";

export class ApplicationVersionManager{

    constructor(model){
        
    }

    public SyncRepository(model: ApplicationModel){

        if(model.version == '0.0.1'){
            
        }
    }

    private createVirtualRepository(model: ApplicationModel){
        const repository = {
            contents: []
        }
        
        repository.contents.push({
            path: 'AppConfigs/pages.ts',
            content: model.toTS()
        })

        return repository;
    }
}