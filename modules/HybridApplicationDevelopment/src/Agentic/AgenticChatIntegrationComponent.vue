<template>
    <div class="agentic-chat-container">
   
            <ChatComponent
            ref="chatComponent"
                :config="props.config"
            >
            </ChatComponent>
    </div>
</template>

<script setup lang="ts">

import { ChatComponent } from 'agenticBusinessIntegration';
import { IConversationConfiguration } from 'agenticBusinessIntegration/src/UI/AgentInterface/ConversationViewModel';
import { useTemplateRef } from 'vue'
const props = defineProps({
    config: Object as () => IConversationConfiguration
})

const chatComponent = useTemplateRef("chatComponent")
console.log(props.config)
defineExpose({
    viewModel: chatComponent
})
// Get the runtime view model
</script>
<style scoped>
.agentic-chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f9f9f9;
}

.connection-status {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f5f5f5;
}

.status-message {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
}

.server-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 8px;
}

.status-indicator.connected {
    background-color: #4CAF50;
}

.status-indicator.disconnected {
    background-color: #F44336;
}

.connect-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.connect-button:hover {
    background-color: #45a049;
}

.chat-interface {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2c3e50;
    color: white;
}

.tools-status {
    display: flex;
    align-items: center;
}

.refresh-button {
    margin-left: 10px;
    padding: 4px 8px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.refresh-button:hover {
    background-color: #2980b9;
}

.chat-instructions {
    padding: 10px 20px;
    background-color: #ecf0f1;
    border-radius: 4px;
    margin-bottom: 10px;
}

.chat-instructions ul {
    margin: 5px 0;
    padding-left: 20px;
}

.chat-instructions li {
    margin: 3px 0;
}
</style>
