
import { IChatHistory } from "../../Data/IChatHistory";
import { WSClient } from '../../ws.client/WSClient'
import { ref, Ref } from 'vue';
import { ILLMAnswer } from './types'
import { ITool } from "../../Tools/ITool";
import { ClientSideToolRegistry } from '../../Tools/client/ClientSideToolRegistry'
import { type IClientSideActionSuggestion } from '../../Tools/client/ClientSideToolSuggestion'

export interface IConversationConfiguration{
    serverUrl: string
    initMessageName: string
    tryInterruptMessageName: string
    answerMessageName: string,
    getConversationDataName: string,
    optionalHandleLLMAnswerCallback?: (answer: ILLMAnswer) => void  
    clientSideTools: Array<ITool>
}

export class ConversationViewModel extends WSClient{
    
    public history: Ref<IChatHistory>;
    public newMessage = ref<string>("");
    private thread_id: string
    private config: IConversationConfiguration
    private toolRegistry: ClientSideToolRegistry
    constructor(
        config: IConversationConfiguration
    ) {
        super(config.serverUrl)
        this.toolRegistry = new ClientSideToolRegistry()

        if(config.clientSideTools){
            for(const tool of config.clientSideTools){
                this.toolRegistry.registerTool(tool)
            }
        }

        this.config = config;
        this.history = ref<IChatHistory>({
            entries: []

        });
        //this.init(config)
      
    }
    private async init(config: IConversationConfiguration){
        this.connect()
        //todo userId session
        this.socket.emit(config.initMessageName, {userId: "Hello World"})

        this.socket.on(config.getConversationDataName, (data: {thread_id: string}) => {
            if(data.thread_id == undefined){
                throw new Error("Need thread-id")
            }
            this.thread_id = data.thread_id
        })
        //get stream messages
        this.socket.on(config.answerMessageName, (answer) => {
            this.handleLMMAnswer(answer)
        })
    }
    public async addMessage(message: string) {
        this.newMessage.value = "";
        this.history.value.entries.push({
            role: "user",
            content: message,
            timestamp: new Date(),
        });

        await this.tryInterruptAssistant(message);
        
    }
    public getAllMessages(){
        return this.history.value.entries
    }

    private async tryInterruptAssistant(message: string){
        this.socket.emit(this.config.tryInterruptMessageName, {
            thread_id: this.thread_id,
            userMessage: message
        })
    }

    private handleLMMAnswer(answer: ILLMAnswer){
        if(answer?.userMessage){
            this.history.value.entries.push({
                id: new Date().toISOString(),
                role: 'assistant',
                content: answer.userMessage,
                timestamp: new Date()
            })
        }
        if(answer.clientSideToolSuggestions){
            for(const sugg of answer.clientSideToolSuggestions){
                this.executeClientSideTool(sugg)
            }
        }
        if(this.config.optionalHandleLLMAnswerCallback){
            this.config.optionalHandleLLMAnswerCallback(answer)
        }
    }

    private executeClientSideTool(sugg: IClientSideActionSuggestion){
        if(sugg.needsUserConfirmation){
                    //todo
        }else{
            this.toolRegistry.executeTool(sugg.action.toolName, ...sugg.action.input)
        }
    }

}