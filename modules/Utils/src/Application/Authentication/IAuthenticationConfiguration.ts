import { AuthenticationLevel } from "./AuthenticationLevel.js";
import { AuthenticationMechanism } from "./AuthenticationMechanism.js";

export interface IAuthenticationConfiguration{
    mechanism: AuthenticationMechanism
    level: AuthenticationLevel
    tokenEndpoint: string
    client_id: string
    client_secret: string
    grant_type: string
    username?: string
    password?: string
}