from flask import request
from flask_socketio import emit, join_room, leave_room
from . import socketio
from .models import db, User, ChatSession, Message
from datetime import datetime
from flask_socketio import ConnectionRefusedError


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print('Error:', e)
    pass
@socketio.on_error_default  # handles all namespaces without an explicit error handler
def default_error_handler(e):
    print('Default Error:', e)
    pass

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected:', request.sid)
    emit('connection_response', {'status': 'connected', 'sid': request.sid})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected:', request.sid)

@socketio.on('join')
def handle_join(data):
    """Handle client joining a chat session"""
    session_id = data.get('session_id')
    if session_id:
        join_room(f"session_{session_id}")
        emit('join_response', {'status': 'joined', 'session_id': session_id}, room=request.sid)
        print(f"Client {request.sid} joined session {session_id}")

@socketio.on('leave')
def handle_leave(data):
    """Handle client leaving a chat session"""
    session_id = data.get('session_id')
    if session_id:
        leave_room(f"session_{session_id}")
        emit('leave_response', {'status': 'left', 'session_id': session_id}, room=request.sid)
        print(f"Client {request.sid} left session {session_id}")

@socketio.on('message')
def handle_message(data):
    """Handle new message from client"""
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

@socketio.on('typing')
def handle_typing(data):
    """Handle typing notification"""
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
