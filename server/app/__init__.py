from flask import Flask
from flask_cors import CORS
from .routes.text_translate import text_translate_bp
from .routes.image_translate import image_translate_bp
from .routes.pdf_translate import pdf_translate_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(text_translate_bp, url_prefix='/api')
    app.register_blueprint(image_translate_bp, url_prefix='/api')
    app.register_blueprint(pdf_translate_bp, utl_prefix='/api')
    return app