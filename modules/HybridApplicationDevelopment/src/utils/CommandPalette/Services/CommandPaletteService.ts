import { CommandPaletteProvider, commandPaletteProvider } from '../CommandPaletterProvider';
import { injectable } from 'inversify';
import { ICommandProvider } from '../ICommandProvider';

@injectable()
export class CommandPaletteService{

    private provider: CommandPaletteProvider;

    constructor(){
        this.provider = commandPaletteProvider;
    }

    public GetCommandProviders(){
        return this.provider.GetCommandProviders();
    }

    public AddCommand(command: ICommandProvider){
        return this.provider.RegisterCommandProvider(command);
    }
}