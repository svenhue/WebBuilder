import Anthropic from "@anthropic-ai/sdk"
import { IChatHistory } from "../Data/IChatHistory"
import { IChatEntry } from "../Data/IChatEntry"
import { ITool } from "../Tools/ITool"

export interface ILLMApi {

    getChatMessageStream(
        message: string,
        setter: (message: string) => void,
    ) : Promise<void>

    getChatMessageAsync(
        messages: IChatEntry[],
        tools?: ITool[],
    ): Promise<string>


}