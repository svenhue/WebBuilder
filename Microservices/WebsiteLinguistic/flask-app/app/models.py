from datetime import datetime
import mongoengine as db

class User(db.Document):
    id = db.StringField(required=True)
    conversationIds = db.ListField(db.StringField())

    def __repr__(self):
        return f'<User {self.username}>'

class UserSession(db.Document):
    id = db.StringField(required=True)
    user_id = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)

    def __repr__(self):

        return f'<ChatSession {self.id}>'

class Conversation(db.Document):
    id = db.St(db.Integer, primary_key=True)
    value = db.DictField()
    timestamp = db.DateTimeField(default=datetime.utcnow)
    user_id = db.StringField(required=True)
    session_id = db.StringField(required=True)

    def __repr__(self):
        return f'<Message {self.id}>'
