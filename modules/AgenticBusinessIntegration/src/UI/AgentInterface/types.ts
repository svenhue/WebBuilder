import { IClientSideActionSuggestion } from '../../Tools/client/IClientSideActionSuggestion'

export interface ILLMAnswer{
    [name: string] : Object
    userMessage: string
    clientSideToolSuggestions: Array<IClientSideActionSuggestion>
}