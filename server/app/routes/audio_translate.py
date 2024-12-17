from flask import Blueprint, request, jsonify
from utils.translator import translate
import speech_recognition as sr
import os

engine = sr.Recognizer()
audio_translate_bp = Blueprint('audio_translate', __name__)

@audio_translate_bp.route('/audio_translate', methods=['POST'])
def audio_translate():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if not file.filename.lower().endswith(('.wav', '.mp3')):
        return jsonify({'error': 'Invalid file type. Please upload a valid audio file.'}), 400
    extracted_text = extract_text(file)
    if extracted_text:
        target_language = request.form.get('target_language', 'en')
        translated_text = translate(extracted_text, target_language)
        return jsonify({'translated_text': translated_text}), 200
    else:
        return jsonify({'error': 'No text extracted from audio.'}), 404

def extract_text(file):
    try:
        with sr.AudioFile(file) as source:
            print("File is being analyzed...")
            audio = engine.record(source)
            text = engine.recognize_google(audio)
            print(f"Extracted Text: {text}")
            return text
    except sr.UnknownValueError:
        print('Speech Recognition could not understand audio.')
        return None
    except sr.RequestError as e:
        print(f"Speech Recognition API error: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None
