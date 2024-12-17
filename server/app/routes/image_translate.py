from flask import Blueprint, request, jsonify
import cv2
import os
import pytesseract
from werkzeug.utils import secure_filename
from utils.translator import translate

image_translate_bp = Blueprint('image_translate', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def preprocess_image(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return binary_image

def extract_text(image):
    resized_image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    processed_image = preprocess_image(resized_image)
    extracted_text = pytesseract.image_to_string(processed_image)
    return extracted_text.strip()

def log_translation_history(file_type, destination_language, input_text, translated_text, token):
    print(f"Translation logged: {file_type}, {destination_language}, {input_text}, {translated_text}, {token}")

@image_translate_bp.route('/image_translate', methods=['POST'])
def image_translate():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename, ALLOWED_EXTENSIONS):
        filename = secure_filename(file.filename)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(image_path)
        image = cv2.imread(image_path)
        extracted_text = extract_text(image)
        target_language = request.form.get('target_language', 'en')
        translated_text = translate(extracted_text, target_language)
        token = request.form.get('token', '') 
        log_translation_history('Image', target_language, extracted_text, translated_text, token)
        os.remove(image_path)
        return jsonify({'translated_text': translated_text})
    else:
        return jsonify({'error': 'File type not allowed'}), 400