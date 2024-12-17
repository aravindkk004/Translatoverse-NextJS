from deep_translator import GoogleTranslator

def translate(input_text, destination_language):
    chunk_size = 5000  
    splitedChunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    translated_result = '' 
    for splitText in splitedChunks:
        translated_text = GoogleTranslator(source='auto', target=destination_language).translate(splitText)
        translated_result += translated_text
    return translated_result