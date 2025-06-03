import { type IClientSideActionSuggestion } from '../../Tools/client/ClientSideToolSuggestion'

export interface ILLMAnswer{
    [name: string] : Object
    userMessage: string
    clientSideToolSuggestions: Array<IClientSideActionSuggestion>
}