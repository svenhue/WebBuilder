interface IDevViewDefinition{
    name: string,
    level: string,
    value: string | number | boolean | string,
}


export interface IViewDevDefinitions{
    type: string,
    definition: Array<IDevViewDefinition>
}