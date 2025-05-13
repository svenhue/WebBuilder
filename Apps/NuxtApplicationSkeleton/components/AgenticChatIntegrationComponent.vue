<template>
    <div class="agentic-chat-container">
        <div v-if="!isConnected" class="connection-status">
            <div class="status-message">
                <p>Connecting to AgenticWebBuilder server...</p>
                <div class="server-status">
                    <span>Server URL: {{ serverUrl }}</span>
                    <span :class="['status-indicator', isConnected ? 'connected' : 'disconnected']"></span>
                </div>
                <button @click="connect" class="connect-button">Connect</button>
            </div>
        </div>
        <div v-else class="chat-interface">
            <div class="chat-header">
                <h2>Website Builder Assistant</h2>
                <div class="tools-status">
                    <span>Available Tools: {{ availableTools.length }}</span>
                    <button @click="refreshTools" class="refresh-button">Refresh Tools</button>
                </div>
            </div>
            <ChatComponent
                :frontline-agent="websiteAgent"
                :agents="[
                    ...hybridAppDevAgents,
                    // Add any other agents you want to include here
                ]"
                @message-sent="handleMessageSent"
                @message-received="handleMessageReceived"
            >
                <template #header>
                    <div class="chat-instructions">
                        <p>Chat with the AI to create and customize your website. You can:</p>
                        <ul>
                            <li>Ask to create a new website</li>
                            <li>Request specific pages or components</li>
                            <li>Modify existing elements</li>
                            <li>Get suggestions for improvements</li>
                        </ul>
                    </div>
                </template>
            </ChatComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { ChatComponent } from 'agenticBusinessIntegration';
import { 
    WebsiteCreationAgent, 
    clientToolsManager, 
    useRuntimeVueApplicationViewModel, 
    initializeAgenticTools,
    ClientSideToolRegistry
} from 'hybridappdev';

// Get the runtime view model
const viewModel = useRuntimeVueApplicationViewModel();

// Server URL
const serverUrl = ref('http://localhost:3001');

// Connection status
const isConnected = ref(false);

// Available tools
const availableTools = ref<any[]>([]);

// Client-side tool registry
const toolRegistry = ref<ClientSideToolRegistry | null>(null);

// Website creation agent
const websiteAgent = ref(new WebsiteCreationAgent([]));

// Hybrid app dev agents
const hybridAppDevAgents = ref<any[]>([]);

// Execute a tool
const executeTool = async (toolName: string, argsString: string) => {
    try {
        // Parse the arguments
        let args: any[] = [];
        if (argsString.trim()) {
            try {
                args = JSON.parse(`[${argsString}]`);
            } catch (e) {
                // If JSON parsing fails, split by commas
                args = argsString.split(',').map(arg => arg.trim());
            }
        }
        
        // Execute the tool
        if (toolRegistry.value) {
            const result = await toolRegistry.value.executeTool(toolName, ...args);
            console.log(`Tool ${toolName} executed successfully:`, result);
            return result;
        } else {
            throw new Error('Tool registry not initialized');
        }
    } catch (error) {
        console.error(`Error executing tool ${toolName}:`, error);
        throw error;
    }
};

// Connect to the backend server
const connect = async () => {
    try {
        // Set the server URL
        clientToolsManager.setServerUrl(serverUrl.value);
        
        // Register client-side tools if we have a view model
        if (viewModel.value) {
            // Initialize the agentic tools
            toolRegistry.value = initializeAgenticTools(viewModel.value);
            
            // Update the website agent with the tool registry
            if (toolRegistry.value) {
                websiteAgent.value.setToolRegistry(toolRegistry.value);
            }
        }
        
        // Connect to the server
        await clientToolsManager.connect();
        isConnected.value = true;
        
        // Get available tools
        await refreshTools();
    } catch (error) {
        console.error('Failed to connect to server:', error);
        isConnected.value = false;
    }
};

// Refresh the available tools
const refreshTools = async () => {
    try {
        const tools = await clientToolsManager.getAvailableTools();
        availableTools.value = tools;
        console.log('Available tools:', tools);
    } catch (error) {
        console.error('Failed to get available tools:', error);
    }
};

// Handle message sent
const handleMessageSent = async (message: any) => {
    console.log('Message sent:', message);
    
    // Check if the message is a tool execution command
    const toolCommandRegex = /^execute_tool\s+(\w+)(?:\s+(.+))?$/i;
    const match = message.content.match(toolCommandRegex);
    
    if (match && toolRegistry.value) {
        const toolName = match[1];
        const argsString = match[2] || '';
        
        // Log the tool execution
        console.log(`Tool execution requested: ${toolName} with args: ${argsString}`);
        
        try {
            // Execute the tool
            const result = await executeTool(toolName, argsString);
            
            // Format the result for display
            const resultStr = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
            
            // Add the result to the chat by sending a message to the agent
            const resultMessage = `Tool ${toolName} executed successfully.\n\nResult:\n\`\`\`json\n${resultStr}\n\`\`\``;
            
            // Send the result to the agent
            if (websiteAgent.value) {
                websiteAgent.value.getAnswerAsync(resultMessage);
            }
            
            console.log(`Tool result:`, result);
        } catch (error) {
            console.error(`Error executing tool:`, error);
            
            // Format the error for display
            const errorMessage = `Error executing tool ${toolName}: ${error instanceof Error ? error.message : String(error)}`;
            
            // Send the error to the agent
            if (websiteAgent.value) {
                websiteAgent.value.getAnswerAsync(errorMessage);
            }
        }
    }
};

// Handle message received
const handleMessageReceived = (message: any) => {
    console.log('Message received:', message);
    
    // Check if the message is asking for available tools
    if (message.content.toLowerCase().includes('available tools') || 
        message.content.toLowerCase().includes('what tools') || 
        message.content.toLowerCase().includes('list tools')) {
        
        // Get the available tools
        const clientTools = toolRegistry.value ? toolRegistry.value.getAllTools() : [];
        const serverTools = availableTools.value || [];
        
        // Format the tools for display
        let toolsMessage = 'Available Tools:\n\n';
        
        // Client-side tools
        if (clientTools.length > 0) {
            toolsMessage += '## Client-side Tools\n\n';
            clientTools.forEach(tool => {
                toolsMessage += `- **${tool.name}**: ${tool.description}\n`;
            });
            toolsMessage += '\n';
        }
        
        // Server-side tools
        if (serverTools.length > 0) {
            toolsMessage += '## Server-side Tools\n\n';
            serverTools.forEach(tool => {
                toolsMessage += `- **${tool.name}**: ${tool.description}\n`;
            });
        }
        
        // Add usage instructions
        toolsMessage += '\n## Usage\n\n';
        toolsMessage += 'To use a tool, type a command in the following format:\n';
        toolsMessage += '```\nexecute_tool [tool_name] [arg1], [arg2], ...\n```\n\n';
        toolsMessage += 'For example:\n';
        toolsMessage += '```\nexecute_tool create_page 1, "Home", "/", "Home Page", "Welcome to our website"\n```';
        
        // Send the tools list to the agent
        if (websiteAgent.value) {
            websiteAgent.value.getAnswerAsync(toolsMessage);
        }
    }
};

// Initialize the chat with a welcome message
const initializeChat = () => {
    if (websiteAgent.value) {
        // Send an initialization message to the agent
        websiteAgent.value.getAnswerAsync('Init website creation conversation');
    }
};

// Connect on component mount
onMounted(async () => {
    try {
        await connect();
        
        // Initialize the chat after connecting
        setTimeout(() => {
            initializeChat();
        }, 1000); // Wait a second for everything to initialize
    } catch (error) {
        console.error('Failed to connect on mount:', error);
    }
});

// Disconnect on component unmount
onUnmounted(() => {
    clientToolsManager.disconnect();
});
</script>

<style scoped lang="scss">
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
