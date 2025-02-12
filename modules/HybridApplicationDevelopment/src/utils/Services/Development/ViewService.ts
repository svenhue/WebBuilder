//@ts-ignore
//@ts-nocheck
import { IViewConfiguration } from "alphautils";

export class ViewService{
    public static createDefaultRootView(): IViewConfiguration{
        const config = {
            type: 'viewdefinition:Application:DefaultRootComponent',
            tag: 'component:DefaultRootComponent',
            name: 'Default Root Component',
            htmlattributes:{
            },
            style: {
                position: 'relative',
                height: '100%',
                width: '100%'
            },
            properties:{
                isactive: true,
            },
            isRoot: true,
        } as IViewConfiguration

        return config;   
    }
}