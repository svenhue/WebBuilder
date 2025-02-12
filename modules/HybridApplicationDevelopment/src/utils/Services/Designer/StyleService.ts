//@ts-ignore

//@ts-nocheck
import { IApplicationConfiguration, SimpleNameValueCollection, CSSProvider, IDataAdapter, DataAdapterOptions } from "alphautils";
import { injectable,inject } from "inversify";
import { Ref, ref } from "vue";

@injectable()
export class StyleService{

    private cssProvider: CSSProvider;
    private dataAdapter: IDataAdapter;
    private contextid: number;
    constructor(
        @inject('ApplicationConfiguration') config: IApplicationConfiguration,
        @inject('CSSProvider') cssProvider: CSSProvider,
        @inject('DataAdapterConstructor') dataAdapterContructor: interfaces.Newabele<IDataAdapter>
    ){
        this.contextid = config.contextid;
  
        this.dataAdapter = new dataAdapterContructor({
            boType:{
                name: 'Colors',
                
            },
            contextId: config.contextid,
            persistLocalStorage: true
        }as DataAdapterOptions, config.contextid);

        //todo why is entity.contextid == entity.id ???
        this.cssProvider = cssProvider;
        
        if(config?.stylesheets?.colors != undefined){
            this.colors = ref(new SimpleNameValueCollection());
            for(const color of config.stylesheets.colors){
                this.dataAdapter.Create({key: color['key'], value: color['value']}, config.contextid, false)
                
            }
        }

        this.cssProvider.ProvideThemeAsCSSElement({
            colors: this.dataAdapter.Get()
        })
    }

    public AddColor(name: string, value: string){
        this.dataAdapter.Create({key: name, value: value}, this.contextid);
    }
    public AddAndActivateColor(name: string, value: string){
        this.AddColor(name, value);
        this.ActivateColor(name);
    }

    public ActivateColor(name: string){
        const color = this.dataAdapter.Get(c => c.key == name)
        if(color == undefined){
            throw new Error('Color not found');
        }
        this.cssProvider.ProvideThemeAsCSSElement({
            colors: this.dataAdapter.Get()
        })
    }
    public DeleteColor(name: string){
        const color = this.dataAdapter.Get(c => c.key == name)
        this.dataAdapter.Delete(color)
        
    }
    public GetColor(name: string){
        return this.dataAdapter.Get(c => c.key == name)
    }
    public GetColors(){
        return this.dataAdapter.Get()
    }
    public SetColor(name: string, value: string){
        this.dataAdapter.UpdatePartial(this.GetColor(name).id, {keyValuePairs:[{key: 'value', value: value}]})
        this.ActivateColor(name);
    }

    public SetApplicationCss(css: string, contextid: number){
        let element = document.getElementById('appbase_css');

        if(element == undefined){
            element = document.createElement('style');
            element.type = 'text/css';
            element.innerHTML = css;
            element.id = 'appbase_css';
            document.head.appendChild(element);
        }


        
    }

    public static SetCssSelectors(css: string){
        if(css.indexOf('appbase') == -1){
            css = css + `.appbase{
                
}`
        }
        return css
    }


}