import { CommandPaletteContextLevels } from './CommandPaletteContextLevels';

export interface ICommandProvider{
    contextLevel: CommandPaletteContextLevels;
    commandName: string;
    label: string;
    execute: (...args) => void;
}