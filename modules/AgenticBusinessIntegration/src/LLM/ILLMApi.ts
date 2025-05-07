import { IChatHistory } from "../Data/IChatHistory"

export interface ILLMApi {

    getChatMessageStream(
        message: string,
        setter: (message: string) => void,
    )

    getChatMessageAsync(
        message: string
    ): Promise<string>


}