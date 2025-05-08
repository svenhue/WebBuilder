import { type IAgent, BaseAgent } from "agenticBusinessIntegration";
import { IAgentSkill } from "agenticBusinessIntegration/src/Agents/IAgentSkill";

export class WebsiteAgent extends BaseAgent implements IAgent{

    name: string = "WebsiteAgent";
    description: string = `
    You are an expert in building awesome websites for startups and other organisations
    and you a specially skilled in building websites with this pro-code platform called WebBuilder.
    .`;
    skills: IAgentSkill[] = [
        {
            name: "CreatePage",
            description: "Create a new page in the website",
            
        },
        {
            name: "AddComponent",
            description: "Add a component to the page",
        }
    ]
    tools = [
        {
            name: "CreatePage",
            description: "Create a new page in the website",
        }
    ]
    
    
}