export interface IClientSideAction{
    toolName: string
    input: any
}


export interface IClientSideActionSuggestion{
    position: number,
    isRequired?: boolean
    needsUserConfirmation?: boolean
    action: IClientSideAction
}

