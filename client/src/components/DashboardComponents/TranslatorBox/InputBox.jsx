"use client";
import {
  resetFiles,
  handleFileDrop,
  handleFileTypeChange,
} from "@/utils/inputbox";
import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const fileTypes = [
  { value: "Text", label: "Text", icon: "/images/text-icon.jpg" },
  { value: "pdf", label: "PDF", icon: "/images/google-drive.png" },
  { value: "image", label: "Image", icon: "/images/imgicon.png" },
  { value: "voice", label: "Voice", icon: "/images/voiceicon.png" },
];

const InputBox = ({
  handleInputText,
  inputText,
  setSelectedFile,
  setFileType,
  setInputText,
}) => {
  // speech recognition
  // var recognition = new webkitSpeechRecognition();
  // recognition.lang = window.navigator.language;
  // recognition.interimResults = true;
  const [recording, setRecording] = useState(false);

  const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedAudio, setSelectedAudio] = useState();
  const [selectedPdf, setSelectedPdf] = useState();

  const ChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileDrop(
      selectedFile,
      selectedFileType,
      setSelectedImage,
      setSelectedPdf,
      setSelectedAudio,
      setSelectedFile
    );
  };

  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileDrop(
      droppedFile,
      selectedFileType,
      setSelectedImage,
      setSelectedPdf,
      setSelectedAudio,
      setSelectedFile
    );
  };
  const handleDropdownSelection = (fileType) => {
    const newFileType = handleFileTypeChange(fileType);
    setFileType(fileType.value);
    setSelectedFileType(newFileType);
    setDropdownOpen(false);
    resetFiles(
      setSelectedImage,
      setSelectedPdf,
      setSelectedAudio,
      setSelectedFile
    ); // Reset files
  };

  const handleTextareaChange = (event) => {
    handleInputText(event);
    resetFiles();
  };

  const RecordVoice = async () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = window.navigator.language;
      recognition.interimResults = true;

      resetFiles(
        setSelectedImage,
        setSelectedPdf,
        setSelectedAudio,
        setSelectedFile
      );
      setFileType("text");
      setSelectedFileType("text");
      setInputText("");
      setRecording(!recording);

      recognition.start();

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        setInputText(result);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        setRecording(false);
        recognition.stop();
      };
    } else {
      console.error(
        "Speech recognition is not supported in this browser or environment."
      );
    }
  };

  return (
    <>
      <div
        className="p-[15px] bg-zinc-200 rounded-xl sm:w-[50%] w-[90%]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* language selector  */}
        <div className="flex items-center">
          <p className="mr-[10px]">From:</p>
          <div className="flex items-center bg-white rounded-full px-[15px] w-[80%]">
            <TbWorld size={"25px"} />
            <select className="w-[100%] p-[10px] rounded-full relative h-[50px] outline-none font-bold">
              <option value="en">English</option>
            </select>
          </div>
        </div>
        {/* textarea  */}
        {!selectedImage && !selectedPdf && !selectedAudio && (
          <div>
            <textarea
              className="bg-white mt-[20px] w-full h-[300px] resize-none rounded-lg outline-none p-[10px]"
              onChange={handleTextareaChange}
              value={inputText}
            />
          </div>
        )}

        {/* other type file show */}
        {selectedImage && (
          <div className="flex justify-center my-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className="max-w-full h-[300px] rounded-lg"
            />
          </div>
        )}

        {selectedPdf && (
          <div className="flex justify-center my-4">
            <iframe
              src={URL.createObjectURL(selectedPdf)}
              title="Selected PDF"
              width="100%"
              height="300px"
              style={{ border: "none" }}
            />
          </div>
        )}

        {selectedAudio && (
          <div className="flex justify-center my-4 h-[295px] items-center">
            <audio controls className="w-full">
              <source
                src={URL.createObjectURL(selectedAudio)}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div
          className="flex items-center text-white my-[5px] cursor-pointer"
          onClick={RecordVoice}
        >
          <MdKeyboardVoice
            size={"40px"}
            className="bg-secondary p-2 rounded-full"
          />
          {recording && <img src="wave.gif" className="h-[50px]" />}
        </div>

        <hr className="border-white border-t-4 my-[10px] -ml-[15px] w-[106%]" />

        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="font-bold my-[10px]">Drop your documents here!</h2>
          <div className="flex items-center bg-white rounded-full px-[15px] py-[10px] cursor-pointer">
            <p className="font-semibold" onClick={ChooseFile}>
              Choose files
            </p>
            <div className="bg-[#f7f7f7] px-[10px] py-[7px] rounded-xl ml-[10px] flex items-center relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={selectedFileType.icon}
                  alt={selectedFileType.label}
                  className="h-[20px] mr-[5px]"
                />
                {selectedFileType.label}
                <IoMdArrowDropdown />
              </div>
              {dropdownOpen && (
                <div className="absolute top-[100%] left-0 bg-white border mt-[5px] rounded-lg z-10">
                  {fileTypes.map((fileType) => (
                    <div
                      key={fileType.value}
                      className="flex items-center px-[10px] py-[5px] cursor-pointer hover:bg-gray-200"
                      onClick={() => handleDropdownSelection(fileType)}
                    >
                      <img
                        src={fileType.icon}
                        alt={fileType.label}
                        className="h-[20px] mr-[5px]"
                      />
                      {fileType.label}
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                accept={
                  selectedFileType.value === "pdf"
                    ? ".pdf"
                    : selectedFileType.value === "image"
                    ? "image/*"
                    : "audio/*"
                }
                className="opacity-0 absolute h-0 w-0"
                onChange={handleFileInputChange}
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputBox;
