import { EventBus } from 'alphautils'
import { ICommandProvider } from './ICommandProvider';


class CommandPaletteProvider{

    private commandPaletteEventBus: EventBus;
    private commandProviders: Array<ICommandProvider> = [];

    constructor(){
        this.commandPaletteEventBus = new EventBus();
    }

    public RegisterCommandProvider(commandProvider: ICommandProvider){
        this.commandProviders.push(commandProvider);
    }

    public GetCommandProviders(): Array<ICommandProvider>{
        return this.commandProviders;
    }

}




const commandPaletteProvider = new CommandPaletteProvider();

export {CommandPaletteProvider, commandPaletteProvider }