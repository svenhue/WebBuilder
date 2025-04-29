# Chat Service

This module implements a real-time chat service for the Flask application using WebSockets with Flask-SocketIO.

## Features

- Real-time messaging using WebSockets
- Chat session management
- Typing indicators
- Message history
- RESTful API endpoints for chat operations

## Architecture

The chat service consists of the following components:

1. **Backend (Flask)**
   - RESTful API endpoints for CRUD operations on chat sessions and messages
   - WebSocket event handlers for real-time communication
   - Database models for storing chat data

2. **Frontend (Vue.js)**
   - Chat component for displaying and interacting with the chat interface
   - ViewModel for managing chat state and communication with the backend

## API Endpoints

- `GET /chat/api/sessions` - Get all chat sessions
- `POST /chat/api/sessions` - Create a new chat session
- `GET /chat/api/sessions/<session_id>` - Get a specific chat session
- `GET /chat/api/messages/<session_id>` - Get messages for a specific chat session
- `POST /chat/api/messages` - Create a new message

## WebSocket Events

- `connect` - Client connects to the server
- `disconnect` - Client disconnects from the server
- `join` - Client joins a chat session
- `leave` - Client leaves a chat session
- `message` - Client sends a new message
- `typing` - Client sends typing notification

## Usage

1. Start the Flask server:
   ```
   python run.py
   ```

2. Connect to the WebSocket server from the frontend:
   ```javascript
   const socket = io('https://localhost:5000');
   ```

3. Join a chat session:
   ```javascript
   socket.emit('join', { session_id: 1 });
   ```

4. Send a message:
   ```javascript
   socket.emit('message', {
     content: 'Hello, world!',
     session_id: 1,
     user_id: 1
   });
   ```

5. Listen for new messages:
   ```javascript
   socket.on('new_message', (message) => {
     console.log('New message:', message);
   });
   ```

## Dependencies

- Flask-SocketIO
- Socket.IO client library
