<template>
    <div class="chat-container">
        <div class="chat-header">
            <h2>{{ viewModel.currentSession.value ? viewModel.currentSession.value.name : 'Chat' }}</h2>
            <button class="new-session-btn">New Chat</button>
        </div>
        
        <div class="sessions-list" v-if="viewModel.showSessions.value">
            <h3>Chat Sessions</h3>
            <ul>
                <li 
                    v-for="session in viewModel.sessions.value" 
                    :key="session.id" 
                    @click="viewModel.selectSession(session.id)"
                    :class="{ active: viewModel.currentSession.value && viewModel.currentSession.value.id === session.id }"
                >
                    {{ session.name }}
                    <span class="message-count">{{ session.message_count }} messages</span>
                </li>
            </ul>
        </div>
        
        <div class="chat-messages" ref="messagesContainer">
            <div 
                v-for="message in viewModel.messages.value" 
                :key="message.id" 
                class="message"
                :class="{ 'user-message': message.user_id === viewModel.currentUser.id }"
            >
                <div class="message-header">
                    <span class="username">{{ message.username }}</span>
                    <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
                </div>
                <div class="message-content">{{ message.content }}</div>
            </div>
            
            <div v-if="viewModel.typingUsers.value.length > 0" class="typing-indicator">
                <span>{{ viewModel.typingUsers.value.join(', ') }} {{ viewModel.typingUsers.value.length === 1 ? 'is' : 'are' }} typing...</span>
            </div>
        </div>
        
        <div class="chat-input">
            <textarea 
                v-model="viewModel.newMessage.value" 
                @keydown.enter.prevent="viewModel.sendMessage"
                @input="viewModel.handleTyping"
                placeholder="Type your message..."
            ></textarea>
            <button @click="viewModel.sendMessage" :disabled="!viewModel.newMessage.value.trim()">Send</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChatViewModel } from './ChatViewModel';
import { onMounted, ref, watch } from 'vue';
const viewModel = new ChatViewModel();
const messagesContainer = ref<HTMLElement | null>(null);

// Format timestamp to a readable time
const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Auto-scroll to bottom when new messages arrive
watch(() => viewModel.messages.value.length, () => {
    setTimeout(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    }, 50);
});

onMounted(() => {
    // Initialize the chat
    viewModel.initialize();
});
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.chat-header h2 {
    margin: 0;
    font-size: 1.2rem;
}

.new-session-btn {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.sessions-list {
    padding: 10px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    max-height: 200px;
    overflow-y: auto;
}

.sessions-list h3 {
    margin-top: 0;
    font-size: 1rem;
}

.sessions-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sessions-list li {
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
}

.sessions-list li:hover {
    background-color: #eee;
}

.sessions-list li.active {
    background-color: #e0e0e0;
}

.message-count {
    font-size: 0.8rem;
    color: #666;
}

.chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #fff;
}

.message {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
    max-width: 80%;
    background-color: #f1f0f0;
}

.user-message {
    margin-left: auto;
    background-color: #dcf8c6;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.8rem;
}

.username {
    font-weight: bold;
    color: #555;
}

.timestamp {
    color: #888;
}

.message-content {
    word-break: break-word;
}

.typing-indicator {
    font-style: italic;
    color: #888;
    margin-top: 10px;
}

.chat-input {
    display: flex;
    padding: 10px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
}

.chat-input textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    height: 40px;
    font-family: inherit;
}

.chat-input button {
    margin-left: 10px;
    padding: 0 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.chat-input button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>
