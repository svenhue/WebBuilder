import { ICommandProvider } from '../ICommandProvider';

export interface ICommandSelectOptions{
    isGrouping: boolean;
    label: string;
    filter: (commandProviders: Array<ICommandProvider>) => Array<ICommandProvider>;
}