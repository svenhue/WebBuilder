import { ref, type Ref } from 'vue';

import type { IChatMessage } from './IChatMessage';
import { MessageSender } from './MessageSender';

export class ChatViewModel{

 
    public messages: Ref<Array<IChatMessage>> = ref([]);
    public chatId: string = "";
    public name: string = "Chat";
    
    constructor(){

        this.setup()
    }
    private setup(){
        //const websocket = new WebSocket("localhost:")
    }

  
    public handleEvent(event: object){

    }

    public createMessage(message: string, publish = true, isLoading = false, sender = MessageSender.User){
        this.messages.value.push({sender: sender, message: message, id: this.messages.value.length, isLoading: isLoading})
    }

}