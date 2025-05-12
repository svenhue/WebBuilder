import { IAgent } from "../../Agents/IAgent";
import { IFrontLineAgent } from "../../Agents/IFrontLineAgent";
import { OrchestrationAgent } from "../../Agents/OrchestrationAgent";
import { IChatHistory } from "../../Data/IChatHistory";
import { ClaudeApi } from "../../LLM/ClaudeApi";
import { ref, Ref } from 'vue';
export class ConversationViewModel {
    
    public history: Ref<IChatHistory>;
    private orchestrator: IFrontLineAgent;
    public newMessage = ref<string>("");

    constructor(agents: Array<IAgent>, frontlineAgent? : IFrontLineAgent) {
        this.history = ref<IChatHistory>({
            entries: []

        });
        console.log(frontlineAgent)
        this.orchestrator =  frontlineAgent != undefined ? new frontlineAgent(
            [
                ...agents
            ]

        ) : new OrchestrationAgent(
            [
                ...agents,
            ],
            new ClaudeApi()
        );
    }
    public async addMessage(message: string) {
        this.newMessage.value = "";
        this.history.value.entries.push({
            role: "user",
            content: message,
            timestamp: new Date(),
        });

        const answer = await this.getAnswerAsync(message);
        
        this.history.value.entries.push({
            role: "assistant",
            content: answer,
            timestamp: new Date(),
        });
    }

    private async getAnswerAsync(message: string): Promise<string> {
        const answer = await this.orchestrator.getAnswerAsync(message);
        return answer;
    }

}