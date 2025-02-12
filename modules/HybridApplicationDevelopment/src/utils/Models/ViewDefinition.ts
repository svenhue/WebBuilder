import { ViewDevDefinitions } from 'alphaviewlibrary'
import { IViewDevDefinitions } from './Interfaces/View/IViewDevDefinitions';

export class ViewDefinition implements IViewDevDefinitions{
    type: string;
    definition: Array<ViewDevDefinitions.IDevViewDefinition>;
    constructor(type: string, definition: Array<ViewDevDefinitions.IDevViewDefinition>){
        this.type = type;
        this.definition = definition;
    }

    public static GetDefinitionByTypeAndName(type: string, name: string){
        let viewdefinition = ViewDevDefinitions.default.viewConfigs.find(v => v.type == type);
        if(viewdefinition == undefined){
            viewdefinition = ViewDevDefinitions.default.viewConfigs.find(v => v.type == 'default');
        }
        const definition = viewdefinition.definitions.find(d => d.name == name);
        if(definition == undefined && viewdefinition.type != 'default'){
            return ViewDevDefinitions.default.viewConfigs.find(v => v.type == 'default').definitions.find(d => d.name == name)?.value;
        }else{
            return definition?.value;
        }
        
    }

    public static GetInfoOrUndefined(type: string){
        const viewDef = ViewDevDefinitions.default.viewConfigs.find(v => v.type == type);
        if(viewDef == undefined){
            return undefined;
        }
        const def = viewDef.definitions.find(d => d.level == 'info');
        return def?.value?.text;
    }
}