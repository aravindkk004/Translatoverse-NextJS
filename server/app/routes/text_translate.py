from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator

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

def translate(input_text, destination_language):
    chunk_size = 5000  
    splitedChunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    translated_result = '' 
    for splitText in splitedChunks:
        translated_text = GoogleTranslator(source='auto', target=destination_language).translate(splitText)
        translated_result += translated_text
    return translated_result