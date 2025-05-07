import { IAgentSkill } from "./IAgentSkill";

export interface IAgent{
    name: string;
    description: string;
    skills: IAgentSkill[];
}