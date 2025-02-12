//@ts-ignore
//@ts-nocheck
import { IDataAdapter, IApplicationConfiguration, IStartup } from "alphautils";
import { Container, interfaces } from "inversify";
import { GlobalVariableDataProvider } from "../GlobalsVariableProvider/GlobalVariableDataProvider";
import { DataContextManager, CSSProvider } from "alphautils";
import { StyleService } from "../../../utils/Services/Designer/StyleService";

export class DefaultRuntimeApplicationStartup implements IStartup{

    
    public InitializeServices(container: Container){
        
        //todo this services needed in production env???
        container.bind<CSSProvider>("CSSProvider").to(CSSProvider).inSingletonScope();
        container.bind<StyleService>("StyleService").to(StyleService).inSingletonScope();
        
        
        new GlobalVariableDataProvider().Provide(
            container.get<IApplicationConfiguration>("ApplicationConfiguration"),
            container.get<interfaces.Newable<IDataAdapter>>("DataAdapterConstructor"),
            container.get<DataContextManager>("DataContextManager"),
            container);

    }
}