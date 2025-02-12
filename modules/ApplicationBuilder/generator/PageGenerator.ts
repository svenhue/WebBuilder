import { spawn } from "child_process";
import { Generator } from "./Generator.js";
import { IPageConfiguration } from "alphautils";

// ts-node-esm generatePages.ts
export class PageGenerator extends Generator{

    
    constructor(){
        super();
    }

    public generate(){
        const pages = this.config.pages;
        
        for(const page of pages){
            if(!this.validatePage(page)){
                //todo log
                continue;
            }

            this.generatePageFile(page);
        }
    }

    public generatePageFile(page: any){
        const pagePath = this.createPagePath(page);
        const pageName = page.name + ".vue";
        
        var commands =  [];  
        commands.push('defaultpage');
        commands.push('new')
        commands.push(`--pageconfig ${JSON.stringify(JSON.stringify(page))}`)
        commands.push(`--filepath ${pagePath}`);
        commands.push(`--filename +Page.vue`);
        this.addHeadCommands(commands, page);
        commands.push('HYGEN_OVERRIDE=1 ')
        const process = spawn('npx hygen', commands, {stdio: 'inherit' , shell: true, env: {'HYGEN_OVERWRITE' : '1'}});
        
        
    }
    private addHeadCommands(commands: string[], page: IPageConfiguration){
        
        if(page.meta != undefined || page.head != undefined){
            commands.push('--usehead true');
        }
        if(page.meta != undefined){
            commands.push('--usemeta true');
        }

        if(page.meta != undefined){
            for(const entry of Object.entries(page.meta)){
                commands.push(`--${entry[0]}="${entry[1]}"`);
            }
        }

        if(page.head != undefined){
            for(const entry of Object.entries(page.head)){
                commands.push(`--${entry[0]}="${entry[1]}"`);
            }
        }

    }
    private validatePage(page: any){
        return true;
    }

    private createPagePath(page: IPageConfiguration){
        let path = this.rootPath;

       
            path += "CustomPages/pages/" + page.route + "/";
        
        return path;
    }
}