import { ref, reactive } from 'vue';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

// Define interfaces for our data structures
export interface User {
    id: number;
    username: string;
}

export interface ChatSession {
    id: number;
    name: string;
    created_at: string;
    message_count: number;
}

export interface Message {
    id: number;
    content: string;
    timestamp: string;
    user_id: number;
    username: string;
    session_id: number;
}

export class ChatViewModel {
    // API endpoint base URL
    private apiBaseUrl = 'https://localhost:5005/chat/api';
    
    // Socket.io connection
    private socket: Socket | null = null;
    
    // User data
    public currentUser = reactive<User>({
        id: 1, // Default user ID (in a real app, this would come from authentication)
        username: 'User' // Default username
    });
    
    // Chat sessions
    public sessions = ref<ChatSession[]>([]);
    public currentSession = ref<ChatSession | null>(null);
    public showSessions = ref<boolean>(true);
    
    // Messages
    public messages = ref<Message[]>([]);
    public newMessage = ref<string>('');
    
    // Typing indicators
    public typingUsers = ref<string[]>([]);
    private typingTimeout: ReturnType<typeof setTimeout> | null = null;
    
    // Initialize the chat
    public async initialize(): Promise<void> {
        // Fetch available chat sessions
        //await this.fetchSessions();
        
        this.connectSocket()
        // Connect to Socket.io server
        //this.connectSocket();
        
        // If there are sessions, select the first one
        if (this.sessions.value.length > 0) {
            this.selectSession(this.sessions.value[0].id);
        }
    }
    
    // Connect to Socket.io server
    private connectSocket(): void {
        this.socket = io('ws://localhost:5005');
        
        // Set up socket event listeners
        this.socket.on('connect', () => {
            console.log('Connected to chat server');
            //this.socket.emit('my event', {data: 'I\'m connected!'});
        });
        
        this.socket.on('disconnect', () => {
            console.log('Disconnected from chat server');
        });
        
        this.socket.on('new_message', (message: Message) => {
            // Add the message to our messages array if it's for the current session
            if (this.currentSession.value && message.session_id === this.currentSession.value.id) {
                this.messages.value.push(message);
            }
        });
        
        this.socket.on('typing_notification', (data: { user_id: number, username: string, is_typing: boolean }) => {
            if (data.user_id !== this.currentUser.id) {
                if (data.is_typing) {
                    // Add user to typing users if not already there
                    if (!this.typingUsers.value.includes(data.username)) {
                        this.typingUsers.value.push(data.username);
                    }
                } else {
                    // Remove user from typing users
                    this.typingUsers.value = this.typingUsers.value.filter(username => username !== data.username);
                }
            }
        });
    }
    
    // Fetch available chat sessions
    public async fetchSessions(): Promise<void> {
        try {
            const response = await fetch(`${this.apiBaseUrl}/sessions`);
            if (response.ok) {
                this.sessions.value = await response.json();
            } else {
                console.error('Failed to fetch sessions:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    }
    
    // Select a chat session
    public async selectSession(sessionId: number): Promise<void> {
        // Leave current session if any
        if (this.currentSession.value && this.socket) {
            this.socket.emit('leave', { session_id: this.currentSession.value.id });
        }
        
        // Find the session in our list
        const session = this.sessions.value.find(s => s.id === sessionId);
        if (session) {
            this.currentSession.value = session;
            
            // Join the new session
            if (this.socket) {
                this.socket.emit('join', { session_id: sessionId });
            }
            
            // Fetch messages for this session
            await this.fetchMessages(sessionId);
        }
    }
    
    // Fetch messages for a session
    public async fetchMessages(sessionId: number): Promise<void> {
        try {
            const response = await fetch(`${this.apiBaseUrl}/messages/${sessionId}`);
            if (response.ok) {
                this.messages.value = await response.json();
            } else {
                console.error('Failed to fetch messages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
    
    // Create a new chat session
    public async createNewSession(): Promise<void> {
        try {
            const response = await fetch(`${this.apiBaseUrl}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `Chat ${new Date().toLocaleString()}`
                })
            });
            
            if (response.ok) {
                const newSession = await response.json();
                this.sessions.value.unshift(newSession);
                await this.selectSession(newSession.id);
            } else {
                console.error('Failed to create session:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating session:', error);
        }
    }
    
    // Send a message
    public async sendMessage(): Promise<void> {
        if (!this.newMessage.value.trim() || !this.currentSession.value) {
            return;
        }
        
        const messageContent = this.newMessage.value;
        this.newMessage.value = ''; // Clear input field immediately
        
        // Send via Socket.io for real-time delivery
        if (this.socket) {
            this.socket.emit('message', {
                content: messageContent,
                session_id: this.currentSession.value.id,
                user_id: this.currentUser.id
            });
        }
        
        // Also send via REST API as a fallback
        try {
            await fetch(`${this.apiBaseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: messageContent,
                    session_id: this.currentSession.value.id,
                    user_id: this.currentUser.id
                })
            });
        } catch (error) {
            console.error('Error sending message via API:', error);
        }
        
        // Send typing stopped notification
        this.sendTypingNotification(false);
    }
    
    // Handle typing notification
    public handleTyping(): void {
        if (!this.currentSession.value || !this.socket) {
            return;
        }
        
        // Send typing notification
        this.sendTypingNotification(true);
        
        // Clear existing timeout if any
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Set timeout to send stopped typing notification after 2 seconds of inactivity
        this.typingTimeout = setTimeout(() => {
            this.sendTypingNotification(false);
        }, 2000);
    }
    
    // Send typing notification
    private sendTypingNotification(isTyping: boolean): void {
        if (!this.currentSession.value || !this.socket) {
            return;
        }
        
        this.socket.emit('typing', {
            session_id: this.currentSession.value.id,
            user_id: this.currentUser.id,
            username: this.currentUser.username,
            is_typing: isTyping
        });
    }
}
