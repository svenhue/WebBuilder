import { VueApplication } from "../Application/VueApplication"
import { IViewConfiguration } from "../View/IViewConfiguration"

//todo move this interface to to view library
export interface IExecutionContextProvider {
    GetContext(contextid: number, requestingComponent?: IViewConfiguration, app?: VueApplication): {components, variables, colors, component, app}
    GetContextAttributes(): Array<string>
}