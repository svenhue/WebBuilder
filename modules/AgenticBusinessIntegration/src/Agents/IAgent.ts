import { IAgentSkill } from "./IAgentSkill";
import { ITool } from "../Tools/ITool";

export interface IAgent{
    name: string;
    description: string;
    skills: IAgentSkill[];
    tools: Array<ITool>
}