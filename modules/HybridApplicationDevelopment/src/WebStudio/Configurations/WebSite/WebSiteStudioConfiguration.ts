import { UIComponentPaletteTypes } from "../../Enums/UIComponentPaletteTypes";
import { IWebStudioConfiguration } from "../../IWebStudioConfiguration";

export class WebSiteStudioConfiguration implements IWebStudioConfiguration{

    public static uiComponentPaletteType = UIComponentPaletteTypes.websiteStudio;

    public static uiComponentPalette = [
        {
            name: "Add quickly",
            components: [
                "viewdefinition:Media:ImageComponent",
                "viewdefinition:Layout:HeaderComponent",
                "viewdefinition:Form:TextAreaComponent",
                "viewdefinition:Basic:ButtonComponent",
                "viewdefinition:Structure:ContainerComponent",
                "viewdefinition:Navigation:NavBarComponent",
                "viewdefinition:Media:VideoComponent",
            ]
        },
        {
            name: "assets",
            load: true, //todo load from backend
        },
        {
            name: "Sections",
            components:[
                
            ]
        }
    ]
}