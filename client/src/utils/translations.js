import axios from "axios";

export const textTranslate = async (text, language) => {
  if (!text) {
    toast.error("Please enter some text to translate");
    return;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/text_translate`,
      { text, target_language: language }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response.data.error || "Translation failed.");
      return null;
    }
  } catch (error) {
    console.error("Error during text translation:", error);
    toast.error("Unable to connect to the translation server.");
    return null;
  }
};

export const imageTranslate = async (selectedFile, selectedLanguage) => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("target_language", selectedLanguage);

    const response = await axios.post(
      `http://127.0.0.1:5000/api/image_translate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response.data.error || "Image translation failed.");
      return null;
    }
  } catch (error) {
    toast.error("Unable to connect to the translation server.");
    return null;
  }
};

export const pdfTranslate = async (selectedFile, selectedLanguage) => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("target_language", selectedLanguage);
  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/pdf_translate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      toast.error(response.data.error || "Image translation failed.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
