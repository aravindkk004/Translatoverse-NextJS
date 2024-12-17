import { FaArrowRightArrowLeft } from "react-icons/fa6";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";
import {
  textTranslate,
  imageTranslate,
  pdfTranslate,
} from "@/utils/translations";
import { useState } from "react";

const TranslatorBoxes = () => {
  const [translating, setTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ta");
  const [inputText, setInputText] = useState(""); //for text input
  const [selectedFile, setSelectedFile] = useState(); //for image, pdf, voice input
  const [fileType, setFileType] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslation = async () => {
    setTranslating(true);
    let translationData = null;
    if (fileType === "image" && selectedFile) {
      translationData = await imageTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "pdf" && selectedFile) {
      translationData = await pdfTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "voice" && selectedFile) {
      translationData = await audioTranslate(selectedFile, selectedLanguage);
    } else if (fileType === "" || fileType === "text") {
      translationData = await textTranslate(inputText, selectedLanguage);
    }
    if (translationData && translationData.translated_text) {
      setTranslatedText(translationData.translated_text);
    } else {
      setTranslatedText("");
    }
    setTranslating(false);
  };

  const handleInputText = (event) => {
    setInputText(event.target.value);
  };

  const languageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-[40px] lg:px-[55px]">
        <div className="flex flex-col items-center gap-[20px] justify-center relative sm:flex-row w-full">
          <InputBox
            handleInputText={handleInputText}
            inputText={inputText}
            setSelectedFile={setSelectedFile}
            setFileType={setFileType}
            setInputText={setInputText}
          />
          <FaArrowRightArrowLeft
            size={"40px"}
            className="absolute top-[48%] sm:left-[47%] md:left-[48%] sm:top-[20px] text-white bg-secondary p-2 rounded-full"
          />
          <OutputBox
            translatedText={translatedText}
            selectedLanguage={selectedLanguage}
            languageChange={languageChange}
          />
        </div>
        <button
          className="bg-secondary text-white py-3 rounded-lg w-full my-[20px]"
          onClick={handleTranslation}
          disabled={translating}
        >
          {translating ? "Translating..." : "Translate"}
        </button>
      </div>
    </>
  );
};

export default TranslatorBoxes;
