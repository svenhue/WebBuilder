import { Sources } from "./Sources";

export class RemoteRepositoryModel{

    source: Sources
    properties: Array<{key: string, value: string}>

    public setSource(source: Sources){
        this.source = source
    }

    public setProperty(value: {key: string, value: string}){
        const p = this.properties.find(p => p['key'] === value?.key)
        if(p){
            p['value'] = value.value
        } else {
            this.properties.push({key: value.key, value: value.value})
        }
    }
}