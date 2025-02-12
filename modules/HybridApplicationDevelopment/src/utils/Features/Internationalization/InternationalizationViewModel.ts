import { BaseViewModel, IApplicationConfiguration } from "alphautils";
import { Ref, ref } from "vue";
import { ILocale } from "./ILocale";
import { ILanguageFileString } from "./ILanguageFileString";
import { VueI18n} from 'vue-i18n'
//todo replace the interfaces with the from utils
export class InternationalizationViewModel{
    
    public static locales = [
        {
            label: 'English (US)',
            value: 'en-US'
        },
        {
            label: 'Spanish',
            value: 'es-ES'
        },
        {
            label: 'French',
            value: 'fr-FR'
        },
        {
            label: 'German',
            value: 'de'
        }
    ]

    langFilesString: Ref<Array<ILanguageFileString>>;
    private i18n: VueI18n
    constructor(
        i18n:  VueI18n,
        config: IApplicationConfiguration){
        this.i18n = i18n
        this.langFilesString = ref(config.internationalization?.locales ?? []);
        
    }
    public GetLanguageFileStrings(): Array<ILanguageFileString>{
        return this.langFilesString.value;
    }
    public GetNotUsedLocales(): Array<ILocale>{
        
        return InternationalizationViewModel.locales.filter(l => this.langFilesString.value.filter(f => f.code == l.value)?.length == 0)
    }
    public GetLocales(): Array<ILocale>{
        return this.langFilesString.value?.map(l => {
            return {
                code: l.code,
                file: l.file,
                name: l.name
            }
        });
    }
    public PrepareConfig(config: IApplicationConfiguration){
        for(const l of this.langFilesString.value){
            config.internationalization.locales.push({
                code: l.code,
                name: l.name,
                file: l.file
            })
        }

    }
    public GetFileStringByCode(code: string): ILanguageFileString{
        return this.langFilesString.value.find(l => l.code == code);
    }

    public SetFileStringByCode(code: string, fileString: string){
        const langFileString = this.langFilesString.value.find(l => l.code == code);
        console.log(code, fileString, langFileString);
        langFileString.fileString = fileString;

        this.UpdateI18n(langFileString)
        
    }

    public AddLanguageFileString(langFileString: ILanguageFileString){
        this.langFilesString.value.push(langFileString);
    }

    private UpdateI18n(file: ILanguageFileString){
        
        console.log(file)
        console.log(this.i18n.getLocaleMessage(file.code))
        const oldMessages = this.i18n.getLocaleMessage(file.code)

        const newMessages = JSON.parse(file.fileString)

        const messages = Object.assign(oldMessages, newMessages)
        
        this.i18n.setLocaleMessage(file.code, messages)
        console.log(this.i18n.getLocaleMessage(file.code))

    }
}