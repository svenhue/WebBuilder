import { IChatEntry } from "../Data/IChatEntry";
import { IChatHistory } from "../Data/IChatHistory";
import { ITool } from "../Tools/ITool";
import { ILLMApi } from "./ILLMApi";
import Anthropic from '@anthropic-ai/sdk';

export class ClaudeApi implements ILLMApi{

    client: Anthropic;
    systemPrompt: string

    constructor(systemPrompt?: string) {
       this.systemPrompt = systemPrompt;
        this.client = new Anthropic({
        
        dangerouslyAllowBrowser: true,
            apiKey: ""
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
        messages: IChatEntry[],
        tools: ITool[],
    ): Promise<string> {
        const response = await this.client.messages.create({
            system: this.systemPrompt,
            tools: tools,
            model: "claude-3-7-sonnet-latest",
            messages: this.convertMessagesToClaudeFormat(messages),
            max_tokens: 2000
        },)
        let contentString = ""
        for (const chunk of response.content) {
            contentString += chunk.text
        }
        return contentString;
    }

    private convertMessagesToClaudeFormat(messages: IChatEntry[]): Array<Anthropic.Message> {
        return messages.map((message) => {
            return {
             
                model: message.model,
                stop_reason: message.stop_reason,
                stop_sequence: message.stop_sequence,
                type: message.type,
                usage: message.usage,
                role: message.role,
                content: message.content
            }
        })
    }
    private convertToolsToClaudeFormat(tools: ITool[]): Array<Anthropic.Tool> {
        return tools.map((tool) => {
            return {
                name: tool.name,
                description: tool.description,
                input_schema: tool.input_schema
            }
        })
    }
}