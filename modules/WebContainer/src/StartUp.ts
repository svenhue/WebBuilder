import { WebContainer } from "@webcontainer/api";

export class StartUp{

    public containerInstance: WebContainer
    constructor(){
        //this.setHeaders();
    }
    public setHeaders(){
        const head = document.head
        const coepMeta = document.createElement('meta');
        coepMeta.httpEquiv = 'Cross-Origin-Embedder-Policy';
        coepMeta.content = 'require-corp';
        head.appendChild(coepMeta);

        const coopMeta = document.createElement('meta');
        coopMeta.httpEquiv = 'Cross-Origin-Opener-Policy';
        coopMeta.content = 'same-origin';

        const rmeta = document.createElement('meta');
        rmeta.httpEquiv = 'Cross-Origin-Resource-Policy';
        rmeta.content = 'cross-origin';
        head.appendChild(rmeta);
        head.appendChild(coopMeta);

    }

    public async Boot(workdir?: string): Promise<WebContainer>{
        /** @type {import('@webcontainer/api').WebContainer}  */
        const webcontainerInstance = await WebContainer.boot(
            {
                
            }
        );
        this.containerInstance = webcontainerInstance;        
        return this.containerInstance;
    }
    public async MountFiles(files){
        await this.containerInstance.mount(files);
       
    }
    public TearDown(){
        this.containerInstance?.teardown();
    }
    

}