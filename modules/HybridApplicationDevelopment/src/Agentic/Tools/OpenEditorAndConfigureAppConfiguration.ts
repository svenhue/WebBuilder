import { ITool } from "agenticBusinessIntegration";
import { BaseServiceProvider, IApplicationConfiguration } from "alphautils";
import { ApplicationService } from "src/utils/Services/Development/ApplicationService";


export class OpenEditorAndConfigureAppConfiguration implements ITool{

    public name: string = "CreateApplicationWithInitialConfigTool";
    public description: string = "Start the application building process by routing to the website builder editor and set the initial Website Configuration";
    
    public actions
    execEnvironment: string = 'client'

    public input_schema = {
        required: ['']
    }

    private service: ApplicationService;

    constructor(){
        this.service = BaseServiceProvider.ServiceWithContext<ApplicationService>('ApplicationService', 0)
    }

    async execute(config: IApplicationConfiguration) : Promise<any>{
        
        await this.service.CreateNewApplicationOnBackendAndThenRoute(config)
    }
}