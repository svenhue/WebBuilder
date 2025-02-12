import { Ref, ref, computed, ComputedGetter } from 'vue';
//import { commandPaletteProvider, CommandPaletteProvider } from '../CommandPaletterProvider';
import { ICommandProvider } from '../ICommandProvider';
import { ICommandSelectOptions } from '../VueComponents/ICommandSelectOption';
import { CommandPaletteContextLevels } from '../CommandPaletteContextLevels';
import { inject, injectable } from 'inversify';
import { CommandPaletteService } from '../Services/CommandPaletteService';


@injectable()
export class CommandPaletteViewModel{

    public modelValue: Ref<Array<string>>;
    private service: CommandPaletteService;
    

    private appScopeCommandGroups: Array<ICommandSelectOptions> = [
        {
            label: 'Recently Selected',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.application})},
        },
        {
            label: 'Actions',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.application})},
        },
        {
            label: 'Components',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.application})},
        }
        
    ]
    private globalScopeCommandGroups: Array<ICommandSelectOptions> = [
        {
            label: 'Recently Opened',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.global})}
        },
        {
            label: 'Apps',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.global})}
        }
       
    ];
    private componentScopeCommandGroups: Array<ICommandSelectOptions> = [
        {
            label: 'Actions',
            isGrouping: true,
            filter: (commandProviders: Array<ICommandProvider>) => {return commandProviders.filter((commandProvider) => {return commandProvider.contextLevel == CommandPaletteContextLevels.component})}
        }
    ];


    constructor(
        @inject(CommandPaletteService) service: CommandPaletteService
    ){
        this.modelValue = ref(null)
        this.service = service;
    }

    public GetCommandOptions(): ComputedGetter<Array<object>>{
        
        
        
        return computed(() => {
            
            const commandProviders = this.service.GetCommandProviders();

            let getCommands;

            if(this.modelValue.value == null || this.modelValue.value.length == 0){
                getCommands = this.GetGlobalScopeCommandOptions(commandProviders);
            }
        
        

            return getCommands();
        })
    }

    private GetGlobalScopeCommandOptions(commands: Array<ICommandProvider>){
        const options = new Array<object>();

        for(const commandGroup of this.globalScopeCommandGroups){
            this.CreateCommandGroup(commandGroup, commands);
        }
        return options;
    }

    private CreateCommandGroup(group: ICommandSelectOptions, commands: Array<ICommandProvider>){
        return [
            {
                label: group.label,
                isGrouping: true,
            },
            ... group.filter(commands)
        ]
    }

    


}