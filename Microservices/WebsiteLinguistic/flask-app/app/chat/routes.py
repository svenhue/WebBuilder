from flask import Blueprint, jsonify, request
from ..models import db, User, ChatSession, Message
from datetime import datetime

chat = Blueprint('chat', __name__)

@chat.route('/api/sessions', methods=['GET'])
def get_sessions():
    """API endpoint to get all chat sessions"""
    chat_sessions = ChatSession.query.order_by(ChatSession.created_at.desc()).all()
    sessions_data = [
        {
            'id': cs.id,
            'name': cs.name,
            'created_at': cs.created_at.isoformat(),
            'message_count': cs.messages.count()
        }
        for cs in chat_sessions
    ]
    return jsonify(sessions_data)

@chat.route('/api/sessions', methods=['POST'])
def create_session():
    """API endpoint to create a new chat session"""
    data = request.get_json()
    session_name = data.get('name', 'New Chat')
    
    # Create a new chat session
    new_session = ChatSession(name=session_name)
    db.session.add(new_session)
    db.session.commit()
    
    return jsonify({
        'id': new_session.id,
        'name': new_session.name,
        'created_at': new_session.created_at.isoformat(),
        'message_count': 0
    }), 201

@chat.route('/api/sessions/<int:session_id>', methods=['GET'])
def get_session(session_id):
    """API endpoint to get a specific chat session"""
    chat_session = ChatSession.query.get_or_404(session_id)
    return jsonify({
        'id': chat_session.id,
        'name': chat_session.name,
        'created_at': chat_session.created_at.isoformat(),
        'message_count': chat_session.messages.count()
    })

@chat.route('/api/messages/<int:session_id>', methods=['GET'])
def get_messages(session_id):
    """API endpoint to get messages for a specific chat session"""
    messages = Message.query.filter_by(session_id=session_id).order_by(Message.timestamp).all()
    messages_data = [
        {
            'id': msg.id,
            'content': msg.content,
            'timestamp': msg.timestamp.isoformat(),
            'user_id': msg.user_id,
            'username': msg.author.username if msg.author else 'Anonymous'
        }
        for msg in messages
    ]
    return jsonify(messages_data)

@chat.route('/api/messages', methods=['POST'])
def create_message():
    """API endpoint to create a new message"""
    data = request.get_json()
    
    # Get required fields
    content = data.get('content')
    session_id = data.get('session_id')
    user_id = data.get('user_id')
    
    if not content or not session_id:
        return jsonify({'error': 'Content and session_id are required'}), 400
    
    # Create a new message
    new_message = Message(
        content=content,
        session_id=session_id,
        user_id=user_id,
        timestamp=datetime.utcnow()
    )
    
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({
        'id': new_message.id,
        'content': new_message.content,
        'timestamp': new_message.timestamp.isoformat(),
        'user_id': new_message.user_id,
        'session_id': new_message.session_id
    }), 201
