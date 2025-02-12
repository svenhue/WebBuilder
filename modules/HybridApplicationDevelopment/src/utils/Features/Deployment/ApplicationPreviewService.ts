
import { IApplicationConfiguration } from "alphautils";
import { ApplicationBuildService } from "./ApplicationBuildService";


export class ApplicationPreviewService extends ApplicationBuildService{


    constructor(){
        super();
    }

    public async startPreview(config: IApplicationConfiguration){
        //todo nuxt errors
        await this.Build(config)

        
    }
}