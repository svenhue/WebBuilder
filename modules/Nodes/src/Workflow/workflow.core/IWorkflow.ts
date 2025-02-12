import { IRuntimeEnvironment } from "src/environment/IRuntimeEnvironment.js";

export interface IWorkflow{
    start(start: IRuntimeEnvironment): void;
}