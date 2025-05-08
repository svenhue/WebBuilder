import { IChatHistory } from "../Data/IChatHistory";
import { ILLMApi } from "./ILLMApi";
import Anthropic from '@anthropic-ai/sdk';

export class ClaudeApi implements ILLMApi{

    client: Anthropic;

    constructor() {
       this.client = new Anthropic({
        dangerouslyAllowBrowser: true,
            apiKey: "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"
       })
    }
    async getChatMessageStream(
        message: string,
        setter: (message: string) => void,
    ){
        const stream = this.client.messages.stream({
            model: "claude-3-7-sonnet-latest",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 1000
        })

        stream.toReadableStream().pipeTo(
            new WritableStream({
                write: (chunk) => {
                    console.log("From claude:  " + chunk)
                }
            })
        )
    }

    async getChatMessageAsync(
        messages: Anthropic.Message[],
        tools: Anthropic.Tool[],
    ): Promise<string> {
        const response = await this.client.messages.create({
            tools: tools,
            model: "claude-3-7-sonnet-latest",
            messages: messages,
            max_tokens: 2000
        })
        let contentString = ""
        for (const chunk of response.content) {
            contentString += chunk.text
        }
        return contentString;
    }
}