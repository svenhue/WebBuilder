from flask_socketio import Namespace, emit
from flask import request
from flask_socketio import join_room, leave_room

from .models import db, User, Conversation, Message
from datetime import datetime
from flask_socketio import ConnectionRefusedError


class ChatNamespace(Namespace):



    def on_connect(self):
        """on client connection"""
        print('Client connected:', request.sid)
        emit('connection_response', {'status': 'connected', 'sid': request.sid})

    def on_getMessages(self, data):
        messages = Conversation.
        emit('getMessages_response', {'status': 'connected', 'sid': request.sid})

    def on_disconnect(self):
        """on client disconnection"""
        print('Client disconnected:', request.sid)


    def on_join(data):
        """on client joining a chat session"""
        session_id = data.get('session_id')
        if session_id:
            join_room(f"session_{session_id}")
            emit('join_response', {'status': 'joined', 'session_id': session_id}, room=request.sid)
            print(f"Client {request.sid} joined session {session_id}")


    def on_leave(data):
        """on client leaving a chat session"""
        session_id = data.get('session_id')
        if session_id:
            leave_room(f"session_{session_id}")
            emit('leave_response', {'status': 'left', 'session_id': session_id}, room=request.sid)
            print(f"Client {request.sid} left session {session_id}")

    def on_message(self, data):
        """on new message from client"""
        content = data.get('content')
        session_id = data.get('session_id')
        user_id = data.get('user_id')
        
        if not content or not session_id:
            emit('error', {'message': 'Content and session_id are required'}, room=request.sid)
            return
        
        # Create a new message
        new_message = Message(
            content=content,
            session_id=session_id,
            user_id=user_id,
            timestamp=datetime.utcnow()
        )
        
        db.session.add(new_message)
        db.session.commit()
        
        # Get username if available
        username = 'Anonymous'
        if user_id:
            user = User.query.get(user_id)
            if user:
                username = user.username
        
        # Broadcast the message to all clients in the session
        message_data = {
            'id': new_message.id,
            'content': new_message.content,
            'timestamp': new_message.timestamp.isoformat(),
            'user_id': new_message.user_id,
            'username': username,
            'session_id': new_message.session_id
        }
        
        emit('new_message', message_data, room=f"session_{session_id}")
        print(f"New message in session {session_id}: {content}")

    def on_typing(data):
        """on typing notification"""
        session_id = data.get('session_id')
        user_id = data.get('user_id')
        username = data.get('username', 'Anonymous')
        is_typing = data.get('is_typing', False)
        
        if session_id:
            emit('typing_notification', {
                'user_id': user_id,
                'username': username,
                'is_typing': is_typing
            }, room=f"session_{session_id}", include_self=False)

