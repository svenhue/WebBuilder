import { ILLMApi } from "../LLM/ILLMApi";
import { IAgent } from "./IAgent";

export interface IFrontLineAgent{
    _avaibleAgents: IAgent[];
    _llm: ILLMApi

    getAnswerAsync(
        string: string
    ): Promise<string>
}