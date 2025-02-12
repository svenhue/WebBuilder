import { IApplicationConfiguration, waitForElm } from "alphautils"
import { ApplicationBuildService } from "../../../Features/Deployment/ApplicationBuildService";
import { Ref, ref } from "vue";
import { ApplicationModel } from "../../../../Models/ApplicationModel";
import { PageModel } from "../../../../Models/PageModel";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export class NodeApplicationServerService{

    private _service: ApplicationBuildService
    private _mountTarget: HTMLIFrameElement
    private _isReady: Ref<boolean>
    private _files: Object
    private _terminal: Terminal
    constructor(target: string, model: ApplicationModel, pages: Array<PageModel>, serverReadyCallback: () => void){
       
        const config = this.prepareConfigFile(model, pages)
        this.setup(target, config)
    }
    private createTerminal(targetEl: string){
        let fitAddon = new FitAddon();
        const terminalEl = document.getElementById(targetEl)
        console.log(targetEl, terminalEl)
        const terminal = new Terminal({
        convertEol: true,
        });
        terminal.loadAddon(fitAddon);
        terminal.open(terminalEl);
        fitAddon.fit();
        return terminal;
    }
    private prepareConfigFile(model: ApplicationModel, pageModels: Array<PageModel>): IApplicationConfiguration{
        const config: IApplicationConfiguration = {}

        Object.assign(config, model)
        config.pages = []
        for(const page of pageModels){
            const pageConfig = {}
            Object.assign(pageConfig, page)
            config.pages.push(pageConfig)
        }
        console.log(123, config)
        return config
    }
    private async setup(target: string, config: IApplicationConfiguration){
        this._isReady = ref(false)
       
        waitForElm('#appTerminal').then(async (el: HTMLIFrameElement) =>{
            this._terminal = this.createTerminal('appTerminal')
            this._service = new ApplicationBuildService(this._terminal)
            await this._service.Build(config, this._files, [], () => this.mountTarget())
        })
        
    }
    private async  mountTarget(){
        let el = document.getElementById('mountpointWrapper') as HTMLIFrameElement;
        this._mountTarget = el
        
        await this._service.startDevServer(el, () => {
            this._isReady.value = true
        
        })
        
    }

    public postMessage(){
        this._mountTarget.contentWindow.postMessage({type: 'ready'}, '*')
    }
}