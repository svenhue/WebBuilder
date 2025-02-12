import { IInternationalization } from "alphautils/src/Application/Localization/IInternationalization";
import { WebContainerService } from "../Deployment/WebContainerService";
import { ILanguageFileString } from "./ILanguageFileString";

export class LocalesFileBuilder{

    private containerService: WebContainerService

    constructor(containerService: WebContainerService){

        this.containerService = containerService;
    }
    

    public async Configure(config: IInternationalization, files: Array<ILanguageFileString>){
        await this.AddMessageFiles(files);
        await this.BuildConfigFile(config)
    }

    private async AddMessageFiles(files: Array<ILanguageFileString>){
        for(const file of files){
            
            await this.containerService.api.containerInstance.fs.writeFile(`./AppConfigs/languages/${file.code}.json`, JSON.stringify(JSON.parse(file.fileString))) 
        }
    }

    private async BuildConfigFile(internationalization: IInternationalization){

        let imports = ''
        let messages = '{ ';
        for(const i of internationalization.locales){
            imports = imports + `
            
            import ${i.code.substring(0, i.code.indexOf('-'))}  from './AppConfigs/languages/${i.code}.json'
            `

            messages = messages + `${i.code.substring(0, i.code.indexOf('-'))} ,`
        }
        messages = messages + '}'


        const fileString = `
                ${imports}
                import { config } from './AppConfigs/pages.ts'

                export default defineI18nConfig(() => ({
                legacy: false,
                defaultLocale: config.internationalization?.defaultLocale,
                locales: config.internationalization?.locales,
                langDir: config.internationalization?.langDir,
                messages: ${messages}
            }))
        `
        console.log(fileString)
        await this.containerService.api.containerInstance.fs.writeFile(`i18n.config.ts`, fileString)


        
    }
}