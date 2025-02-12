/** @satisfies {import('@webcontainer/api').FileSystemTree} */

import { WebContainer, WebContainerProcess } from "@webcontainer/api";
import { Terminal } from 'xterm';
export class BuildEnvironment{
 
    public terminal: Terminal
    constructor(term: Terminal){
        this.terminal = term;
      
    }
    public async CreateEnvironment(api: WebContainer, rootFolder: string, files, logInConsole: boolean = false){
      
      if(!rootFolder){
        rootFolder = './public';
      }
      
     
      await api.mount(files);
    
      await this.InstallDependencies(api, logInConsole);
      console.log("Dependencies installed")
    }

    public async InstallDependencies(api: WebContainer, logInConsole: boolean = false, cwd = './public'){
      
      const terminal = this.terminal
      const installProcess = await api.spawn('npm', ['install'],{
        terminal: {
          cols: this.terminal.cols,
          rows: this.terminal.rows,
        }
      }).catch((e) => console.log(e));

      if(logInConsole){
        installProcess.output.pipeTo(new WritableStream({
          write(chunk) {
            terminal.write(chunk)
          }
        
        }))
      }

      return installProcess.exit;    
    }
    
    public async RunCommand(api: WebContainer, command: string, args: string[], logInConsole: boolean = false, callbackKeyWord?: string, callback?: void){
      const result = await api.spawn(command, args,
        {
          terminal: {
            cols: this.terminal.cols,
            rows: this.terminal.rows,
          }
        }
      );
      const terminal = this.terminal;
      if(logInConsole){
        result.output.pipeTo(new WritableStream({
          write(chunk) {
            terminal.write(chunk)
            if(chunk.includes(callbackKeyWord)){
              if(callback != undefined){
                callback();
              }
            }
          }
        }))
      }
      return result
    }

}