<template>
    <div class="chat-view">
        <div class="chat-content">
            
            <div v-for="message in viewModel.messages.value" :key="message.id" :class="messageClass(message)">
                <div class="message-header">

                </div>
                <div class="message-content">
                    <VueMarkdownRendererComponent
                        :markdown="message.message">

                    </VueMarkdownRendererComponent>
                </div>
                <div class="message-footer">

                </div>
            </div>
        </div>

        <div class="input-wrapper">
            <textarea  
            
            class="chat-input" 
            @keyup.enter="() => { viewModel.createMessage(messageModel); messageModel = ''}"  v-model="messageModel"  placeholder="Ask mindcode">
                
            </textarea>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, ref, type TextareaHTMLAttributes } from 'vue';
import { ChatViewModel } from './ChatViewModel';

import type { IChatMessage } from './interfaces';
import { MessageSender } from './MessageSender';
import VueMarkdownRendererComponent from './LLMMarkdownwithActionableTextComponent.vue';
import { useViewConfiguration } from 'alphautils';

const props = defineProps({
    viewId: {
        type: String,
        required: true
    },
    contextid: {
        type: Number,
        required: false
    }
})

const {view} = useViewConfiguration(props.contextid, props.viewId);
const viewModel = new ChatViewModel();

const messageModel= ref("")

function messageClass(message: IChatMessage){
    return message.sender == MessageSender.User ? 'user-message' : 'bot-message';
}


</script>

<style lang="scss" scoped>
.chat-view {
    margin-top: 200px;
    background-color: #1e1e1e;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    padding: 5px;
    box-sizing: border-box;
    
    .input-wrapper {
        border-radius: 15px;
        width: 100%;
        position: absolute;
        bottom: 12px;
        z-index: 99;
        transition: all 0.3s ease;
        
        
        .chat-input {
            background-color: #2d2d2d;
            color: #ffffff;
            padding: 5px;
            resize: vertical;
            border: 1px solid #3d3d3d;
            border-radius: 12px;
            width: calc(100% - 10px);
            min-height: 36px;
            font-size: 14px;
            line-height: 1.5;
            box-sizing: border-box;
            transition: all 0.3s ease;
            
            &:focus {
                outline: none;
                border-color: #007acc;
            }
            
            &::placeholder {
                color: #6e6e6e;
            }
        }
    }
    
    .chat-content {
        height: calc(100% - 100px);
        width: 100%;
        margin-bottom: 70px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        
        .user-message, .bot-message {
            max-width: 80%;
            margin-bottom: 8px;
            animation: fadeIn 0.15s ease;
            border-radius: 8px;

            .message-content {
                color: #ffffff;
                font-size: 12px;
                line-height: 1.5;
                
                :deep(pre) {
                    background-color: #1a1a1a;
                    border-radius: 8px;
                    padding: 12px;
                    margin: 8px 0;
                    overflow-x: auto;
                }
                
                :deep(code) {
                    font-family: 'Consolas', monospace;
                    font-size: 13px;
                }
                
                :deep(p) {
                    margin: 8px 0;
                }
            }
        }
        
        .user-message {
            align-self: flex-end;
            background-color: #2b5797;
            padding-left: 5px;
            padding-right: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .bot-message {
            align-self: flex-start;
            background-color: #2d2d2d;
           
            padding-left: 5px;
            padding-right: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>