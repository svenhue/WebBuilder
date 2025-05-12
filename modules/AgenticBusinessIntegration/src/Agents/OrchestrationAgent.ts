import { IChatEntry } from "../Data/IChatEntry";
import { IChatHistory } from "../Data/IChatHistory";
import { IWorkGraphNode, IWorkOrder, WorkGraph, WorkStrategy } from "../Data/WorkGraph";
import { ILLMApi } from "../LLM/ILLMApi";
import { BaseAgent } from "./BaseAgent";
import { IAgent } from "./IAgent";
import { IFrontLineAgent } from "./IFrontLineAgent";

export class OrchestrationAgent extends BaseAgent implements IFrontLineAgent{

    name: string = "OrchestrationAgent";
    
    workStrategyDecisionPrompt: (userMessage: string) => string = (userMessage) => {return `
        We expect only exceptional results from you.
        Therefore, before each answer, we need to decide which work strategy to use.
        The user message that we want to answer is:
        "
        ${userMessage}
        "

        This are the available work strategies:
        If you think you have an alternative, better work strategy, please tell me about it and then use it!

        ${
            "name:" + WorkStrategy.actOnly.name,
            "description:" + WorkStrategy.actOnly.description,
            "requiresPlanningEvaluationOrRelease:" + WorkStrategy.actOnly.requiresPlanningEvaluationOrRelease,
            "supportedWorkTypes:" + WorkStrategy.actOnly.supportedWorkTypes.map(type => `
                {
                    typeName: ${type.toString()}
                }
            `)
        }

        When you have decided which work strategy to use, we must build a work graph for this user message.
        A Work graph is a directed graph that represents the work to be done.
        Each node in the graph represents a task or a piece of work, and the edges represent the dependencies between these tasks.

        For example, consider this user message:
        
        "I want to create a website for my car repair shop."

        The (simplified) work graph for this user message could look like this:

        {
            nodes: [
                {
                    id: "1",
                    workFullfillmentPosition: 1,
                    description: "Decide about the website brand including the colors, the font style, the logo and the theme",
                    type: WorkTypes.complexTaskExecution,
                    isTaskRoot: true,
                    responsibleEntity: "WebsiteDesignAgent",
                },
                {
                    id: "2",
                    workFullfillmentPosition: 2,
                    description: "Decide about the website structure including the number of pages, the content and the layout",
                    type: WorkTypes.conversionalEvaluation,
                    responsibleEntity: "WebsiteDesignAgent",
                },
                {
                    id: "3",
                    workFullfillmentPosition: 3,
                    description: "Create the landingpage",
                    type: WorkTypes.simpleTaskExecution,
                    responsibleEntity: "WebsiteDesignAgent",
                },
                
            ],
            edges: [
                {
                    sourceId: "1",
                    targetId: "2"
                },
                {
                    sourceId: "1",
                    targetId: "3"
                }
            ]
        }

        Format your answer as JSON in this format:
        "The answer text..." (maximum two sentences!)

        :Object:WorkOrder
        {
            strategy: "planAndAct" // "planAndAct" or "actOnly" are the only possible values
            nodes: [
                ... the nodes of the work graph
            ],
            edges: [
                ... the edges of the work graph
            ]
        }
        :Object:End
    `}

    _avaibleAgents: IAgent[];
    _llm: ILLMApi;
    _context: IChatHistory
    _workGraph: WorkGraph

    constructor(
        availableAgents: IAgent[],
        llm: ILLMApi
    ) {
        super();
        this._avaibleAgents = availableAgents;
        this._llm = llm;
    }

    //  
    async getAnswerAsync(
        message: string
    ): Promise<string> {
        const {answer, workOrder} = await this.createWorkOrder(message);
        console.log(answer, workOrder);
        return answer;
    }

    getMessages(
        newMessage: string, 
        contextWindowDefinition?: any): Array<IChatEntry> {
        
        if(contextWindowDefinition == undefined){
            return [{
                role: "user",
                content: newMessage,
                timestamp: new Date()
            }]
        }else{
            return //todo
        }
    }
    async createWorkOrder(
        message: string
    ): Promise<{answer: string, workOrder: IWorkOrder}>{
        const answer = await this._llm.getChatMessageAsync(this.getMessages(this.workStrategyDecisionPrompt(message)))
        const workOrderString = answer.split(":Object:End")[0].split(":Object:WorkOrder")[1];
        const workOrder = JSON.parse(workOrderString) as IWorkOrder;
        return {
            answer: answer.split(":Object:WorkOrder")[0],
            workOrder: workOrder
        };
    }

    async decideResponsibleAgent(
        userMessage: string
    ): Promise<IAgent> {
        let message = `
            I am the Orchestration Agent. 
            I have the following agents available: 
            ${this._avaibleAgents.map(agent => `
                {
                    agentName: ${agent.name},
                    agentDescription: ${agent.description},
                    agentSkills: ${agent.skills.map(skill => `
                        {
                            skillName: ${skill.name},
                            skillDescription: ${skill.description}
                        }
                    `)}
                }
            `
            )}
            Please decide (by returning ONLY the agent name, nothing else! Just one word!) which agent is best fitted 
            and responsible for answering message: ${userMessage}
        `
        const llmResult = await this._llm.getChatMessageAsync(message);
        
        const agentName = llmResult.replaceAll(' ', '')
        const agent = this._avaibleAgents.find(agent => agent.name === agentName);
        if (!agent) {
            throw new Error(`Agent ${agentName} not found in available agents.`);
        }
        return agent;
    }
    

}