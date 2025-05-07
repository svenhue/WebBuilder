import { type IAgent } from "./src/Agents/IAgent";
import { type ILLMApi } from "./src/LLM/ILLMApi";
import { type IChatHistory } from "./src/Data/IChatHistory";
import { type IChatEntry } from "./src/Data/IChatEntry";
import { type IFrontLineAgent } from "./src/Agents/IFrontLineAgent";

import ChatComponent from "./src/UI/AgentInterface/ChatComponent.vue";

export {
    IAgent,
    ILLMApi,
    IChatHistory,
    IChatEntry,
    IFrontLineAgent,
    ChatComponent
}