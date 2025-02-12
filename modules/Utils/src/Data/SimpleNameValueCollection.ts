import { KeyValuePair } from "./KeyValuePair.js";

export class SimpleNameValueCollection{

    public keyValuePairs: Array<KeyValuePair>;

    constructor(keyValuePairs?: Array<KeyValuePair>){
        this.keyValuePairs = keyValuePairs ?? new Array<KeyValuePair>();
    }

    public add(key: string, value: string){
        this.keyValuePairs.push(new KeyValuePair(key, value));
    }

    public get(key: string): string{
        let result: string = null;
        this.keyValuePairs.forEach(kvp => {
            if(kvp.key == key){
                result = kvp.value;
            }
        });
        return result;
    }
    public setValue(key: string, value: string){
        const kvp = this.keyValuePairs.find(kvp => kvp.key == key);
        if(kvp){
            kvp.value = value;
        }else{
            this.add(key, value);
        }
    }
    public remove(key: string){
        this.keyValuePairs.forEach((kvp, index) => {
            if(kvp.key == key){
                this.keyValuePairs.splice(index, 1);
            }
        });
    }
    public toObject(){
        const result = {};
        this.keyValuePairs.forEach(kvp => {
            result[kvp.key] = kvp.value;
        });
        return result;
    }
}