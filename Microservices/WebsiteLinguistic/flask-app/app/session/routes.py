from flask import Blueprint, jsonify, request
from ..models import db, User, ChatSession, Message
from datetime import datetime

session = Blueprint('session', __name__)

@session.route('/api/sessions', methods=['GET'])
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

@session.route('/api/sessions', methods=['POST'])
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

@session.route('/api/sessions/<int:session_id>', methods=['GET'])
def get_session(session_id):
    """API endpoint to get a specific chat session"""
    chat_session = ChatSession.query.get_or_404(session_id)
    return jsonify({
        'id': chat_session.id,
        'name': chat_session.name,
        'created_at': chat_session.created_at.isoformat(),
        'message_count': chat_session.messages.count()
    })

