from flask import Blueprint, request, jsonify
from utils.translator import translate

text_translate_bp = Blueprint('text_translate', __name__)

@text_translate_bp.route('/text_translate', methods=['POST'])
def text_translate():
    data = request.get_json() 
    text = data.get('text')  
    target_language = data.get('target_language')

    if not text or not target_language:
        return jsonify({"error": "Text and target_language are required"}), 400
    try:
        translated_text = translate(text, target_language)
        return jsonify({'translated_text': translated_text})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400 