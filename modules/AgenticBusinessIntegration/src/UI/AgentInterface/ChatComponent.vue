<template>
        <div class="chat-container">
            <div class="chat-header">
               

            </div>

            <div class="chat-messages">
                <div v-for="message in viewModel.history.value.entries" :key="message.id" class="message">
                    <div :class="getMessageClass(message.role)">
                        

                        <div class="message-content">{{ message.content }}</div>    
                        

                    </div> 
                </div>
            </div>
            <input class="chat-input" v-model="viewModel.newMessage.value" @keyup.enter="() => viewModel.addMessage(viewModel.newMessage.value)" placeholder="Type a message..." />
        </div>
</template>



<script setup lang="ts">
import { Ref } from 'vue';
import { ConversationViewModel } from './ConversationViewModel';
import { IAgent } from '../../Agents/IAgent';
import { IFrontLineAgent } from '../../Agents/IFrontLineAgent';

const props = defineProps({
    agents: {
        type: Object as () => Array<IAgent>,
        required: false
    },
    frontlineAgent: {
        type: Object as () => IFrontLineAgent,
        required:false
    }
});

function getMessageClass(messageRole: string){
    if(messageRole == 'user'){
        return 'user-message chat-message'
    }else if(messageRole == 'assistant'){
        return 'assistant-message chat-message'
    }
}


const viewModel = new ConversationViewModel(props.agents, props.frontlineAgent);


</script>

<style lang="scss" scoped>

.chat-container{
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    min-width: 300px;

    .chat-messages{
        width:100%;
        height: 100%;
        
        .chat-message{
            margin-bottom: 5px;
        }
        .user-message{
            align-self:end;
            right: 0px;
            text-align: right;
            width: fit-content;
            margin-left: auto;
        }
        .assistant-message{
            align-self:start;
            margin-right: auto;
            width: fit-content;
        }
    }
    
    .chat-input{
        bottom:20px;
        position:absolute;
        width: calc(100% - 20px);
    }

}


</style>
