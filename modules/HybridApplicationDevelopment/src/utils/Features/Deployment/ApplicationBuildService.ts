import { ApplicationDeploymentModes, IApplicationConfiguration } from "alphautils";
import { Dir } from "./IDirsAndFiles";
import { WebContainerService } from "./WebContainerService";
import FileSaver from 'file-saver';
import JSZip, { file } from 'jszip';
import { IInternationalization } from "alphautils/src/Application/Localization/IInternationalization";
import { i } from "vite/dist/node/types.d-FdqQ54oU";
import { LocalesFileBuilder } from "../Internationalization/LocalesFileBuilder";
import { ILanguageFileString } from "../Internationalization/ILanguageFileString";
import { Terminal } from 'xterm';
import { files as Files } from './files'
export class ApplicationBuildService extends WebContainerService{

    private readonly _buildOutputDirectory: string = './.output';
    private readonly _appConfigDirectory: string = './AppConfigs/'

    constructor(terminal: Terminal){
        super(terminal)
    }
    public async Download(config: IApplicationConfiguration, files: Array<ILanguageFileString>){
        if(this.isReady.value != true && config == undefined){
            throw new Error("Container isnt ready")
        }else{
            await this.Build(config, Files, files, Load)
        }

        async function Load(self: ApplicationBuildService){
            const result = await self.GetBuildDirectory()
            
            const zip = await self.CreateZip(result)
            await zip.generateAsync({ type: 'blob', compression: "STORE" }).then(function (content) {
                FileSaver.saveAs(content, 'download.zip');
            });
        }
            

    }
    public async DownloadProject(config: IApplicationConfiguration, files: Array<ILanguageFileString>){
        if(this.isReady.value != true && config == undefined){
            throw new Error("Container isnt ready")
        }else{
            await this.Build(config, Files, files, Load)
        }

        async function Load(self: ApplicationBuildService){
            const result = await self.GetRootDirectory()
            
            const zip = await self.CreateZip(result)
            await zip.generateAsync({ type: 'blob', compression: "STORE" }).then(function (content) {
                FileSaver.saveAs(content, 'download.zip');
            });
        }
            

    }
    public async Build
    (
        config: IApplicationConfiguration, 
        projectFiles: Object,
        files: Array<ILanguageFileString>, 
        callback: (self: ApplicationBuildService) => Promise<void>
    ){
        
        if(this.isReady.value == false){
            await this.boot(projectFiles);
        }
       
        await this.env.RunCommand(this.api.containerInstance, 'npm', ['run', 'generatePages'], true)

        //spa/ mpa or static pages/ ssr?
        const command = ['run']
       
        //todo use enum
        if(config.deploymentMode == 'staticSites' || (config.deploymentMode == 'spaclient' && config.ssr == false)){
            command.push('generate')
        }else{
            command.push('build')
        }
        await this.DoPreBuildRoutine(config, files)


        await this.env.RunCommand(this.api.containerInstance, 'npm', command, true, "You can preview", async () => { // you can deploy XX for generate
            
            await this.DoPostBuildRoutine()

            await callback(this)
        }
        );
        return;
    }

    private async CreateZip(dirx: Dir){
       
        const zip = new JSZip();

        for(const dir of dirx.subDirs){
            createContent(dir)
        }
        
        for(const file of dirx.files){
            //fix this in place
            zip.file(dirx.name + "/"+ file.name, file.value, {compression:"STORE"})
        }
        

        function createContent(dir: Dir){
            for(const file of dir?.files){
                let dirPath = dir.name + '/' + file.name

                if(dirPath.startsWith("/")){
                    dirPath = dirPath.substring(1);
                }

                zip.file(dirPath, file.value, {compression: "STORE"})
            
            }

            for(const subDir of dir.subDirs){
                createContent(subDir)
            }  
        }
        return zip;
    }

        

    private async GetBuildDirectory(): Promise<Dir>{
        
        const result = await copyDirOrFile(this._buildOutputDirectory, this)
        async function copyDirOrFile(dirPath, self: ApplicationBuildService){

            const dirFn = await self.api.containerInstance.fs.readdir(dirPath)

            const rootDir: Dir = {name: dirPath, files: [], subDirs: []}

                for(const dirOrFile of dirFn){  
                    let isDir = true
                    let file;
                    
                    try{
                        file = await self.api.containerInstance.fs.readdir(dirPath + '/' + dirOrFile, { encoding: 'utf-8'})
                        
                    }catch(e){
                        isDir = false
                    }
                    if(!isDir){
                        file = self.api.containerInstance.fs.readFile(dirPath + '/' + dirOrFile, "utf-8")
                        
                        rootDir.files.push({value:file, name: dirOrFile})

                    }else{
                        
                        const newDir = await copyDirOrFile(dirPath + '/' + dirOrFile, self)
                        rootDir.subDirs.push(newDir)
                    }
                }
                return rootDir;
        }

        //transform ./.output to /output

        function fixOutputPath(dir: Dir){
            dir.name = dir.name.substring(3)

            for(const d of dir?.subDirs){
                fixOutputPath(d)
            }
        }

        fixOutputPath(result);

        return result;
        
    }
    private async DoPreBuildRoutine(config: IApplicationConfiguration, files: Array<ILanguageFileString>){
        await this.CreateAppConfigFile(config)
        await new LocalesFileBuilder(this).Configure(config.internationalization, files)
    }


    //this routine is a workaroung for two know bugs
    private async DoPostBuildRoutine(){

        // edit the package.json of source-map-js
        // todo how to transform the strings correctly?
        try{
            let newFileString;
            let oldFileString = await this.api.containerInstance.fs.readFile(this._buildOutputDirectory + "/server/node_modules/source-map-js/package.json", "utf-8");

            newFileString = oldFileString.replace(',\n    "Nicolas Lalevée <nicolas.lalevee@hibnet.org>"', ',\n    "Nicolas Laleveee <nicolas.lalevee@hibnet.org>"')
            newFileString = newFileString.replace('\n    "Eddy Bruël <ejpbruel@mozilla.com>",', '\n    "Eddy Bruel <ejpbruel@mozilla.com>",')
            
            await this.api.containerInstance.fs.writeFile(this._buildOutputDirectory + "/server/node_modules/source-map-js/package.json", newFileString)
            
        }catch(err){
        }

        // delete all content-length headers for chunks in public/_nuxt because they are partially wrong
        //todo workaround?
        try{
            const runtimePath = this._buildOutputDirectory + "/server/chunks/nitro/nitro.mjs"
            const dir: string[] = await this.api.containerInstance.fs.readdir(this._buildOutputDirectory + '/public/_nuxt', { encoding: 'utf-8'})

            let oldFileString: string = await this.api.containerInstance.fs.readFile(runtimePath, "utf-8")
           
            for (const fileName of dir.filter(x => x.includes(".js") || x.includes(".css"))){  
           
           
                const indexStart = oldFileString.indexOf("/_nuxt/" + fileName)
                if(indexStart == -1){
                    continue;
                }
                const sizeIndex = oldFileString.indexOf("size", indexStart);

                const indexComma = oldFileString.indexOf(",", sizeIndex);

                const stringToReplace = oldFileString.substring(sizeIndex-1, indexComma +1 )

                oldFileString = oldFileString.replace(stringToReplace, "")
                

            }
            await this.api.containerInstance.fs.writeFile(runtimePath, oldFileString);

        }catch(err){
        }
    }

    //this file is essential for the generated application
    private async CreateAppConfigFile(config: IApplicationConfiguration){
        //  we create the new file with the new config
        await this.api.containerInstance.fs.writeFile(this._appConfigDirectory + 'pages.ts', 'export const config = ' + JSON.stringify(config))
    }

    
}                      