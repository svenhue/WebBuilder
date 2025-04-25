from flask import Flask
from flask_socketio import SocketIO
from .models import db

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.register_error_handler(400, lambda e: ('Bad Reques<xt', 400))
    # Load configuration
    app.config.from_object('config.Config')

    # Initialize extensions
    db.init_app(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()

    # Import and register blueprints
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Import and register chat blueprint
    from .chat.routes import chat as chat_blueprint
    app.register_blueprint(chat_blueprint, url_prefix='/chat')

    # Initialize SocketIO
    from .chat_namespace import ChatNamespace

    socketio.on_namespace(ChatNamespace('/chat'))
    socketio.init_app(app, cors_allowed_origins="*",logger=True, engineio_logger=True)
    
    
    
    return app
