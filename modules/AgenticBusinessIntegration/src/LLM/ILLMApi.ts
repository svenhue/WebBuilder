import Anthropic from "@anthropic-ai/sdk"
import { IChatHistory } from "../Data/IChatHistory"

export interface ILLMApi {

    getChatMessageStream(
        message: string,
        setter: (message: string) => void,
    ) : Promise<void>

    getChatMessageAsync(
        messages: Anthropic.Message[],
        tools: Anthropic.Tool[],
    ): Promise<string>


}