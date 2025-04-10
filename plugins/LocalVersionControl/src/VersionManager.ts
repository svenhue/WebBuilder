import { IRepository } from "node_modules/alphautils/src/Data/Repositorys/IRepository";
import { GitHubAPI } from "./GitHub/GithubAPI";
import { RemoteRepositoryModel } from "./RemoteRepositoryModel";
import { IRepositoryChanges } from "./RepositoryChanges";
import { IRemoteRepository } from "./IRepository";

export class VersionManager{

    public model: RemoteRepositoryModel

    constructor(model: RemoteRepositoryModel){
        
        if(model == undefined){
            throw new Error("Model is undefined")
        }
        console.log(model)
        if(model.source == undefined){
            throw new Error("Source is undefined")
        }
        if(model.properties == undefined){
            throw new Error("Properties are undefined")
        }
        this.model = model;
    }

    public PushContent(content: IRemoteRepository | IRepositoryChanges){
        for(const change of content.contents ?? content.changes){
            this.UseApi()
                ?.pushFile(change.path, change.content, change.message ?? "Update file")
        }
            
    }

    private UseApi(){
        switch(this.model.source){
            case 'github':
                return new GitHubAPI(this.model.properties.find(p => p['key'] === 'url')?.value, this.model.properties.find(p => p['key'] === 'token')?.value)
        }
    }
}