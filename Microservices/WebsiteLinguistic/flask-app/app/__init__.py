from flask import Flask
from flask_socketio import SocketIO
from .models import db
from flask_cors import CORS
import bson

from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo
import os
from pymongo.errors import DuplicateKeyError, OperationFailure
from bson.objectid import ObjectId
from bson.errors import InvalidId
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine

socketio = SocketIO()
db = MongoEngine()

def create_app():
    load_dotenv()

    app = Flask(__name__)

    # Load configuration
    app.config.from_object('config.Config')
    app.config["MONGO_URI"] = os.getenv('mongodb')
    
    app.config['MONGODB_SETTINGS'] = [
        {
            "db": "databasename",
            "host": "localhost",
            "port": 27017,
            "username": "mongousername",
            "password": "password123",
            "alias": "default",
        }
    ]
    db.init_app(app)
    

    # Import and register blueprints
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
 
    # Import and register chat blueprint
    from .session.routes import session as session_blueprint
    app.register_blueprint(session_blueprint)
        # Initialize SocketIO


    CORS(app, origins="*")
    
    
    from .chat_namespace import ChatNamespace

   
    socketio.init_app(app, cors_allowed_origins="*",logger=True, engineio_logger=True)
    socketio.on_namespace(ChatNamespace('/chat'))
    
    
    return app


