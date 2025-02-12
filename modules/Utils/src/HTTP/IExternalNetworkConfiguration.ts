import { IAuthenticationConfiguration } from "../Application/Authentication/IAuthenticationConfiguration.js";
import { SimpleNameValueCollection } from "../Data/SimpleNameValueCollection.js";

export interface IExternalNetworkConfiguration {
    name: string;
    url: string;
    authentication: IAuthenticationConfiguration;
    headers: SimpleNameValueCollection;
}