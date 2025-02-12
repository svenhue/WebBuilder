import * as config from '../renderer/app.config.json' assert { type: "json" };  // IApplicationConfiguration

export class Generator{
 
    config: any; // IApplicationConfiguration
    rootPath: string = "../src/";

    constructor(){
        this.loadConfig();
    }

    private loadConfig(){
        this.config = config['default'];
    }

}