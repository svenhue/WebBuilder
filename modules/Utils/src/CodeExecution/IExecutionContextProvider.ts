import { VueApplication } from "../Application/VueApplication.js"
import { IViewConfiguration } from "../View/IViewConfiguration.js"

//todo move this interface to to view library
export interface IExecutionContextProvider {
    GetContext(contextid: number, requestingComponent?: IViewConfiguration, app?: VueApplication): {components, variables, colors, component, app}
    GetContextAttributes(): Array<string>
}