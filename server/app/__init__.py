from flask import Flask
from flask_cors import CORS
from .routes.text_translate import text_translate_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(text_translate_bp, url_prefix='/api')
    
    return app