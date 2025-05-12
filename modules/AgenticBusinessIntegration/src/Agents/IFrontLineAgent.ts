import { IChatHistory } from "../Data/IChatHistory";
import { ILLMApi } from "../LLM/ILLMApi";
import { IAgent } from "./IAgent";

export interface IFrontLineAgent{
    _avaibleAgents: IAgent[];
    _llm: ILLMApi
    _context: IChatHistory
    getAnswerAsync(
        string: string
    ): Promise<string>
}