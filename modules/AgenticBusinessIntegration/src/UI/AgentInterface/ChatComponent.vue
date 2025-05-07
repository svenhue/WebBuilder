<template>
    <div>
        <div class="chat-container">
            <div class="chat-header">
                <h1>Chat with Agent</h1>
            </div>
            <div class="chat-messages">
                <div v-for="message in viewModel.messages" :key="message.id" class="message">
                    <strong>{{ message.sender }}:</strong> {{ message.text }}
                </div>
            </div>
            <input v-model="viewModel.newMessage.value" @keyup.enter="() => viewModel.addMessage(viewModel.newMessage.value)" placeholder="Type a message..." />
        </div>
    </div>

</template>



<script setup lang="ts">
import { Ref } from 'vue';
import { ConversationViewModel } from './ConversationViewModel';

const viewModel = new ConversationViewModel();


</script>