//@ts-nocheck
//@ts-ignore


import { IApplicationComponentFactory, ViewConfiguration } from "alphautils";

export class HybridDevelopmentAppComponentFactory implements IApplicationComponentFactory{

    private static components = [
        
    ]
    create(config: ViewConfiguration){
        switch(config.componentName){
 
            
            default:
                throw new Error('Component not found')
        }
    }
}